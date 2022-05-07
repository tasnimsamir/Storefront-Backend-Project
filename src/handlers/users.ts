import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import verifyAuthToken from '../middlewares/jwtauth'
import jwt from 'jsonwebtoken'

const store = new UserStore()

const { TOKEN_SECRET } = process.env;
const secretToken = TOKEN_SECRET;

const index = async(_req:Request,res:Response)=>{
    try{
        const users = await store.index();
        if (!users){
            res.status(404);
            res.json({error:'users are not found'})
        };
        res.json(users);
    }catch(err){
        res.status(400);
        res.json(err);
    }  
}

const show = async(req:Request,res:Response)=>{
    try{
        const user = await store.show(req.params.id);
        if (!user){
            res.status(404)
            res.json({error:'Invalid User!'})
        };
        res.json(user);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password_digest: req.body.password_digest,
        };

        const newUser = await store.create(user);
        if (!newUser){
            res.status(404)
            res.json({error:'Cannot register this user'})
        };
        res.json(newUser);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const destroy = async(req:Request,res:Response)=>{
    try{
        const user = await store.show(req.params.id);
        console.log('done')
        if (!user){
            res.status(404);
            res.json({error:'Invalid User!'});
        }
        else{
            const deleted = await store.delete(req.params.id);
            res.status(200).json(deleted);
        }
    }catch(err){
        res.status(400);
        res.json({ERROR: `${err}`});
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
      id:req.body.id,
      firstname: '',
      lastname: '',
      password_digest: req.body.password_digest,
    }
    try {
        const u = await store.authenticate(user.id as string, user.password_digest)
        var token = jwt.sign({ user: u }, secretToken as string);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', verifyAuthToken, create);
    app.delete('/users/:id', verifyAuthToken, destroy);
    app.post("/users/auth", authenticate);
  }
  
  export default userRoutes;