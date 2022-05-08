import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

const request = supertest(app);

let user:User;
const secrettoken = 'udacity'


describe('Testing jwt Auth middleware', (): void => {

  beforeAll(() => {
    user = {
        firstname: 'Andy',
        lastname: 'Sam',
        password_digest: 'password123'
    }
  });

  it('Endpoint: /users [GET]', async (): Promise<void> => {
    const token = jwt.sign(user, secrettoken); 
    const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(401);
    expect(response.text).toBe('"Access denied, invalid token"');
  });
});
