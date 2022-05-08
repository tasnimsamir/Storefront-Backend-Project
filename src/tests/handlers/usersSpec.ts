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
let token:string;
let createuser:User;

describe('Testing Handlers of the Users', (): void => {

    beforeAll(async()=>{
      createuser = await userstore.create(user);
      token = jwt.sign(createuser, process.env.TOKEN_SECRET as string);
    });

    it('Endpoint: /users [GET]', async (): Promise<void> => {
      const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('Endpoint: /users [POST]', async (): Promise<void> => {
        const response = await request.post('/users').send(user);
        expect(response.status).toBe(200);
        await userstore.delete(response.body.id);
    });

    it('Endpoint: /users/:user_id [GET]', async (): Promise<void> => {
      const response = await request.get(`/users/${createuser.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    afterAll(async()=>{
      await userstore.delete(createuser.id as string);
    })
  });