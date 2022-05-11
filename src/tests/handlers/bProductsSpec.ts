import supertest from 'supertest';
import app from '../../server';
import { Product, ProductStore } from '../../models/product';
import TestUser from './aUsersSpec';

const request = supertest(app);

const product:Product = {
  product_name: 'lipstick',
  price: 310,
  category: "beauty"
}

const productstore = new ProductStore();

const ProductCreated = async(product:Product)=>{
  try{
    const createproduct = await productstore.create(product);
    return {testProduct: createproduct as Product}
  }
  catch(err){
    throw new Error(err as string);
  }
}

const TestProduct = ProductCreated(product);


describe('Testing Handlers of the Products', (): void => {


    it('Endpoint: /products [POST]', async (): Promise<void> => {
      const response = await request.post('/products').set('Authorization', `Bearer ${(await TestUser).testToken}`).send(product);
      expect(response.status).toBe(200);
    });

    it('Endpoint: /products [GET]', async (): Promise<void> => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });


    it('Endpoint: /products/:product_id [GET]', async (): Promise<void> => {
      const response = await request.get(`/products/${(await TestProduct).testProduct.id}`);
      expect(response.status).toBe(200);
    });
  });
