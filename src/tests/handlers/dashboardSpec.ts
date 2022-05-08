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

describe('Testing Handlers of the Dashboard Services', (): void => {

    it('Endpoint: /top5products', async (): Promise<void> => {
      const response = await request.get('/top5products');
      expect(response.status).toBe(200);
    });
    
    it('Endpoint: /catProducts/fashion', async (): Promise<void> => {
      const response = await request.get('/catProducts/fashion');
      expect(response.status).toBe(200);
    });

    it('Endpoint: /completedOrders/user/:user_id', async (): Promise<void> => {
      const createuser = await userstore.create(user);
      const token = jwt.sign(createuser, process.env.TOKEN_SECRET as string);
      const response = await request.get(`/completedOrders/user/${createuser.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      await userstore.delete(createuser.id as string);
    });
  });