import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';

const request = supertest(app);

const product:Product = {
  product_name: 'lipstick',
  price: 310,
  category: "beauty"
}

const productstore = new ProductStore();
let token:string;
let createproduct:Product;

const user:User = {
  firstname: 'Andy',
  lastname: 'Sam',
  password_digest: 'password123'
}
const userstore = new UserStore();
let createuser:User;

describe('Testing Handlers of the Products', (): void => {

    beforeAll(async()=>{
      createuser = await userstore.create(user);
      createproduct = await productstore.create(product);
      token = jwt.sign(createuser, process.env.TOKEN_SECRET as string);
    });

    it('Endpoint: /products [POST]', async (): Promise<void> => {
      const response = await request.post('/products').set('Authorization', `Bearer ${token}`).send(product);
      expect(response.status).toBe(200);
      await productstore.delete(response.body.id);
    });

    it('Endpoint: /products [GET]', async (): Promise<void> => {
      const response = await request.get('/products').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });


    it('Endpoint: /products/:product_id [GET]', async (): Promise<void> => {
      const response = await request.get(`/products/${createproduct.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    afterAll(async()=>{
      await userstore.delete(createuser.id as string);
      await productstore.delete(createproduct.id as string);
    })
  });