import express, { Request, Response } from 'express'
import { Order,OrderStore } from '../models/order'
import verifyAuthToken from '../middlewares/jwtauth'
import { UserStore } from '../models/user';

const store = new OrderStore();
const userstore = new UserStore();

const index = async(_req:Request,res:Response)=>{
    try{
        const orders = await store.index();
        if (!orders){
            res.status(404);
            res.json({error:'There is no Orders'})
        };
        res.json(orders);
    }catch(err){
        res.status(400);
        res.json(err);
    }  
}

const show = async(req:Request,res:Response)=>{
    try{
        const user = await userstore.show(req.params.user_id);
        const order = await store.show(req.params.user_id);
        if (!user){
            res.status(404).json({error: "Invalid User"});
        }
        else if(!order || order.length===0){
            res.status(404).json({error:'This client makes no order!'});
        }
        else{
            res.status(200).json(order);
        }
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            order_status: req.body.order_status,
            user_id: req.params.user_id,
        };

        
        const user = await userstore.show(req.params.user_id);

        if (!user){
            res.status(404).json({error: "Invalid User"});
        }
        else{
            const newOrder = await store.create(order);
            if (!newOrder){res.status(404).json({error:'This client makes no order!'});}
            else{res.status(200).json(newOrder);}
        }
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const destroy = async(req:Request,res:Response)=>{
    try{
        const order = await store.showorderbyid(req.params.id);
        if (!order){
            res.status(404);
            res.json({error:'Invalid order!'});
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

const orderRoutes = (app: express.Application) => {
    app.get('/orders',verifyAuthToken, index);
    app.delete('/orders/:id',verifyAuthToken, destroy);
    app.get('/users/:user_id/orders',verifyAuthToken, show);
    app.post('/users/:user_id/orders', verifyAuthToken, create);
  }
  
export default orderRoutes;