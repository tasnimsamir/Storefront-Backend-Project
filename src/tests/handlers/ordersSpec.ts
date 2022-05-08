import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { User,UserStore } from '../../models/user';
import { Order,OrderStore } from '../../models/order';

const request = supertest(app);

const user:User = {
  firstname: 'Andy',
  lastname: 'Sam',
  password_digest: 'password123'
}
const order:Order = {
  order_status: 'in progress',
  user_id: '1'
}

const userstore = new UserStore();
const orderstore = new OrderStore();

describe('Testing Handlers of the Orders of specific user', (): void => {

    it('Endpoint: /users/:user_id/orders [GET]', async (): Promise<void> => {
      const createuser = await userstore.create(user);
      const token = jwt.sign(createuser, process.env.TOKEN_SECRET as string);
      order.user_id = createuser.id as string;
      const createorder = await orderstore.create(order);
      const response = await request.get(`/users/${createuser.id}/orders`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      await orderstore.delete(createorder.id as string);
      await userstore.delete(createuser.id as string);  
    });

  });