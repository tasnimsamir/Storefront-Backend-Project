import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'
import { Order } from '../models/order'
import { UserStore } from '../models/user'
import verifyAuthToken from '../middlewares/jwtauth'

const dashboard = new DashboardQueries();
const userstore = new UserStore();

const topFivePopularProducts = async(_req:Request,res:Response)=>{
  try{
      const topProducts = await dashboard.topFivePopularProducts();
      if (!topProducts){
          res.status(404).json({error:'NO TOP PRODUCTS !'});
      }
      else{res.json(topProducts);}
  }catch(err){
      res.status(400);
      res.json({ERROR: err});
  }  
}

const productsByCategory = async(req:Request,res:Response)=>{
    try{
        const catProducts = await dashboard.productsByCategory(req.params.category);
        if (!catProducts){
            res.status(404).json({error:'unable get products with such category'});
        }
        else{res.json(catProducts);}
    }catch(err){
        res.status(400);
        res.json(err);
    }  
  }


const completedOrders = async(req:Request,res:Response)=>{
    try{
        const order: Order = {
            order_status: req.body.order_status,
            user_id: req.params.user_id,
        };
        const user = await userstore.show(req.params.user_id);
        if (!user){
            res.status(404).json({error: "Invalid User"});
        }
        else{
            const completed_Orders = await dashboard.completedOrders(order.user_id,order.order_status);
            if (!completed_Orders){res.status(404).json({error:'unable get completed orders by this user'});}
            else{res.status(200).json(completed_Orders);}
        }
    }catch(err){
        res.status(400);
        res.json(err);
    }  
}

  

const dashboardRoutes = (app: express.Application) => {
    app.get('/top5products', topFivePopularProducts);
    app.get('/catProducts/:category', productsByCategory);
    app.get('/completedOrders/user/:user_id', verifyAuthToken ,completedOrders);
}


export default dashboardRoutes;