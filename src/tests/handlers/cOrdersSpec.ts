import supertest from 'supertest';
import app from '../../server';
import TestUser from './aUsersSpec';

const request = supertest(app);

describe('Testing Handlers of the Orders of specific user', (): void => {

    it('Endpoint: /users/:user_id/orders [GET]', async (): Promise<void> => {
      const response = await request.get(`/users/${(await TestUser).testUser.id}/orders`).set('Authorization', `Bearer ${(await TestUser).testToken}`);
      expect(response.status).toBe(404);
    });

  });