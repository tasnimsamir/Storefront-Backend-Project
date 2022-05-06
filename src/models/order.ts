// @ts-ignore
import Client  from '../database'
import { QueryResult, PoolClient} from 'pg';


export type Order = {
    id?: string;
    order_status: string;
    user_id: string;
}


export class OrderStore{
    async index(): Promise<Order[]>{
        try {
            // @ts-ignore
            const conn:PoolClient = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result:QueryResult = await conn.query(sql);
            conn.release;
            return result.rows as Order[]
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async show(user_id:string): Promise<Order[]>{
        try{
            // @ts-ignore
            const conn: PoolClient = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result:QueryResult = await conn.query(sql,[user_id]);
            conn.release;
            return result.rows as Order[];
        }catch(err){
            throw new Error(err as string);
        }
    }

    async create(o:Order): Promise<Order>{
        try{
            // @ts-ignore
            const conn: PoolClient = await Client.connect();
            const sql = 'INSERT INTO orders (order_status,user_id) Values ($1,$2) RETURNING *';
    
            const result:QueryResult = await conn.query(sql,[o.order_status,o.user_id as string]);
            conn.release;
            return result.rows[0] as Order;
        }catch(err){
            throw new Error (`unable create this Order: ${err}`);
        }
    }

}