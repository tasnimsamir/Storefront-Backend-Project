import supertest from 'supertest';
import app from '../../server';
import TestUser from './aUsersSpec';

const request = supertest(app);


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
      const response = await request.get(`/completedOrders/user/${(await TestUser).testUser.id}`).set('Authorization', `Bearer ${(await TestUser).testToken}`);
      expect(response.status).toBe(200);
    });
  });