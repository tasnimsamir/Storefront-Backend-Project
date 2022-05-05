// @ts-ignore
import Client  from '../database'
import { QueryResult, PoolClient} from 'pg';
import bcrypt from 'bcrypt';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;

export type User = {
    id?: string;
    firstname: string;
    lastname: string;
    password_digest: any;
}

export class UserStore {
    async index(): Promise<User[]>{
        try{
            // @ts-ignore
            const conn: PoolClient = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result:QueryResult = await conn.query(sql);
            conn.release;
            return result.rows as User[]
        }catch(err){
            throw new Error(err as string);
        }
    }

    async show(user_id:string): Promise<User>{
        try{
            // @ts-ignore
            const conn: PoolClient = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result:QueryResult = await conn.query(sql,[user_id]);
            conn.release;
            return result.rows[0] as User;
        }catch(err){
            throw new Error(err as string);
        }
    }

    async create(u:User): Promise<User>{
        try{
            // @ts-ignore
            const conn: PoolClient = await Client.connect();
            const sql = 'INSERT INTO users (firstname,lastname,password_digest) Values ($1,$2,$3) RETURNING *';
            
            const hash = bcrypt.hashSync(
                u.password_digest + pepper, 
                parseInt(saltRounds as string)
            );

            const result:QueryResult = await conn.query(sql,[u.firstname,u.lastname,hash]);
            conn.release;
            return result.rows[0] as User;
        }catch(err){
            throw new Error (`unable create this user: ${err}`);
        }
    }

    async authenticate(id:string, password: string): Promise<User | null> {
        try{
            // @ts-ignore
            const conn:PoolClient = await Client.connect();
            const sql = 'SELECT password_digest FROM users WHERE id=($1)';
            const result:QueryResult = await conn.query(sql, [id]);
        
            if(result.rows.length) {
        
              const user = result.rows[0]
              if (bcrypt.compareSync(password+pepper, user.password_digest)) {
                return user
              }
            }
            return null
        }
        catch(err){
            throw new Error(`Invalid User ${err}`)
        }  
    }

}