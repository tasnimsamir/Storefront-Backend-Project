import { Product,ProductStore } from "../../models/product";
import TestProduct from "../handlers/bProductsSpec";

const productstore = new ProductStore();
let product : Product; 


describe ('Testing product model', ():void =>{

    beforeAll(() => {
        product = {
            product_name: 'lipstick',
            price: 310,
            category: 'beauty'
        }
    });

    it('INDEX method should be defined',():void =>{
        expect(productstore.index()).toBeDefined();
    });

    it('SHOW method should be defined',():void =>{
        expect(productstore.show).toBeDefined();
    });

    it('CREATE method should be defined',():void =>{
        expect(productstore.create).toBeDefined();
    });

    it('The product is inserted with CREATE method', async() => {
        expect((await TestProduct).testProduct.product_name).toEqual(product.product_name);
        expect((await TestProduct).testProduct.price).toEqual(product.price);
        expect((await TestProduct).testProduct.category).toEqual(product.category);
    });

});