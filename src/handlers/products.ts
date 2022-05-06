import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import verifyAuthToken from '../middlewares/jwtauth'


const store = new ProductStore();

const index = async(_req:Request,res:Response)=>{
    try{
        const products = await store.index();
        if (!products){
            res.status(404);
            res.json({error:'products are not found'})
        };
        res.json(products);
    }catch(err){
        res.status(400);
        res.json(err);
    }  
}

const show = async(req:Request,res:Response)=>{
    try{
        const product = await store.show(req.params.id);
        if (!product){
            res.status(404)
            res.json({error:'There is no such product!'})
        };
        res.json(product);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            product_name: req.body.product_name,
            price: req.body.price,
            category: req.body.category,
        };

        const newProduct = await store.create(product);
        if (!newProduct){
            res.status(404)
            res.json({error:'Cannot add this product'})
        };
        res.json(newProduct);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
  }
  
  export default productRoutes;