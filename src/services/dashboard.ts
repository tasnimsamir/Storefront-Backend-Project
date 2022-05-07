// @ts-ignore
import Client from '../database'
import { PoolClient, QueryResult } from 'pg'
import { Product } from '../models/product'
import { Order } from '../models/order'

type topProduct = {
  product_name: string;
  quantity: number;
}

export class DashboardQueries {
  // Get Top 5 most popular products 
  async topFivePopularProducts(): Promise<topProduct[]> {
    try {
      //@ts-ignore
      const conn:PoolClient = await Client.connect();
      const sql = 'SELECT product_name,SUM(quantity) AS quantity_sum FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY product_name ORDER BY quantity_sum DESC LIMIT 5;';
      const result:QueryResult = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.log(err)
      throw new Error(`unable get top 5 popular products: ${err}`)
    } 
  }

  // Get products with specific category 
  async productsByCategory(category:string): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn:PoolClient = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category=($1)';
      const result:QueryResult = await conn.query(sql,[category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products with such category: ${err}`)
    } 
  }

  // Get completed orders by specific user 
  async completedOrders(user_id:string,order_status:string): Promise<Order[]> {
    try {
      //@ts-ignore
      const conn:PoolClient = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
      const result:QueryResult = await conn.query(sql,[user_id,order_status]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get completed orders by this user: ${err}`)
    } 
  }
}