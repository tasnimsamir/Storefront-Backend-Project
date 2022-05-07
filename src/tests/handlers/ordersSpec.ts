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

describe('Testing Handlers of the Orders of specific user', (): void => {

    it('Endpoint: /users/2/orders [GET]', async (): Promise<void> => {
      const response = await request.get('/users/2/orders').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

  });