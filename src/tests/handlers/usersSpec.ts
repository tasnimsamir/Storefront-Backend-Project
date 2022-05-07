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

describe('Testing Handlers of the Users', (): void => {

    it('Endpoint: /users [GET]', async (): Promise<void> => {
      const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('Endpoint: /users [POST]', async (): Promise<void> => {
        const response = await request.post('/users').set('Authorization', `Bearer ${token}`).send(user);
        expect(response.status).toBe(200);
    });

    it('Endpoint: /users/2 [GET]', async (): Promise<void> => {
      const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });