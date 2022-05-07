// @ts-ignore
import Client  from '../database'
import { QueryResult, PoolClient} from 'pg';


export type Product = {
    id?: string;
    product_name: string;
    price: number;
    category: string;
}

export class ProductStore{
    async index(): Promise<Product[]>{
        try {
            // @ts-ignore
            const conn:PoolClient = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result:QueryResult = await conn.query(sql);
            conn.release;
            return result.rows as Product[]
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async show(product_id:string): Promise<Product>{
        try{
            // @ts-ignore
            const conn: PoolClient = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result:QueryResult = await conn.query(sql,[product_id]);
            conn.release;
            return result.rows[0] as Product;
        }catch(err){
            throw new Error(err as string);
        }
    }

    async create(p:Product): Promise<Product>{
        try{
            // @ts-ignore
            const conn: PoolClient = await Client.connect();
            const sql = 'INSERT INTO products (product_name,price,category) Values ($1,$2,$3) RETURNING *';
    
            const result:QueryResult = await conn.query(sql,[p.product_name,p.price,p.category]);
            conn.release;
            return result.rows[0] as Product;
        }catch(err){
            throw new Error (err as string);
        }
    }

    async delete(product_id:string): Promise<Product>{
        try{
            // @ts-ignore
            const conn: PoolClient = await Client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result:QueryResult = await conn.query(sql,[product_id]);
            conn.release;
            return result.rows[0] as Product;
        }catch(err){
            throw new Error(err as string);
        }
    }
}