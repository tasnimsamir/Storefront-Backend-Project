import supertest from 'supertest';
import app from '../../server';
import { Order,OrderStore } from '../../models/order';
import TestUser from './aUsersSpec';

const request = supertest(app);

const order:Order = {
  order_status: 'in progress',
  user_id: '1'
}

const orderstore = new OrderStore();


const OrderCreated = async(order:Order)=>{
  try{
    order.user_id  =  (await TestUser).testUser.id as string
    const createorder = await orderstore.create(order);
    return {testorder: createorder as Order}
  }
  catch(err){
    throw new Error(err as string);
  }
}

const TestOrder = OrderCreated(order);

describe('Testing Handlers of the Orders of specific user', (): void => {

    it('Endpoint: /users/:user_id/orders [GET]', async (): Promise<void> => {
      const response = await request.get(`/users/${(await TestUser).testUser.id}/orders`).set('Authorization', `Bearer ${(await TestUser).testToken}`);
      expect(response.status).toBe(200);
    });

  });

  export default TestOrder;