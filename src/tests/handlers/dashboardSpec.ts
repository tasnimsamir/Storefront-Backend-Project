import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

const request = supertest(app);

const user:User = {
  firstname:"tasnim",
  lastname:"samir",
  password_digest: "password123"
}
const token = jwt.sign(user, process.env.TOKEN_SECRET as string);

describe('Testing Handlers of the Dashboard Services', (): void => {

    it('Endpoint: /top5products', async (): Promise<void> => {
      const response = await request.get('/top5products');
      expect(response.status).toBe(200);
    });
    
    it('Endpoint: /catProducts/fashion', async (): Promise<void> => {
      const response = await request.get('/catProducts/fashion');
      expect(response.status).toBe(200);
    });

    it('Endpoint: /completedOrders/user/2', async (): Promise<void> => {
      const response = await request.get('/completedOrders/user/2').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });