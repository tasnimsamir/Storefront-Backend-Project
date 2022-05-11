import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { User,UserStore } from '../../models/user';

const request = supertest(app);

const user:User = {
  firstname: 'Andy',
  lastname: 'Sam',
  password_digest: 'password123'
}

const userstore = new UserStore();

const UserCreated = async(user:User)=>{
  try{
    const createuser = await userstore.create(user);
    const token = jwt.sign(createuser, process.env.TOKEN_SECRET as string);
    return {testUser: createuser as User, testToken: token}
  }
  catch(err){
    throw new Error(err as string);
  }
}

const TestUser = UserCreated(user);


describe('Testing Handlers of the Users', (): void => {

    it('Endpoint: /users [GET]', async (): Promise<void> => {
      const response = await request.get('/users').set('Authorization', `Bearer ${(await TestUser).testToken}`);
      expect(response.status).toBe(200);
    });

    it('Endpoint: /users [POST]', async (): Promise<void> => {
        const response = await request.post('/users').send(user);
        expect(response.status).toBe(200);
        await userstore.delete(response.body.id);
    });

    it('Endpoint: /users/:user_id [GET]', async (): Promise<void> => {
      const response = await request.get(`/users/${(await TestUser).testUser.id}`).set('Authorization', `Bearer ${(await TestUser).testToken}`);
      expect(response.status).toBe(200);
    });
  });

export default TestUser;