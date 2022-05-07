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
const secrettoken = 'udacity'
const token = jwt.sign(user, secrettoken);

describe('Testing jwt Auth middleware', (): void => {
    it('Endpoint: /users [POST]', async (): Promise<void> => {
        const response = await request.post('/users').set('Authorization', `Bearer ${token}`).send(user);
        expect(response.status).toBe(401);
        expect(response.text).toBe('"Access denied, invalid token"');
    });
});
