import { Product,ProductStore } from "../../models/product";

const productstore = new ProductStore();



describe ('Testing product model', ():void =>{

    // beforeAll(() => {
    //     product = {
    //         product_name: 'lipstick',
    //         price: 120,
    //         category: 'beauty'
    //     }
    // });

    it('INDEX method should be defined',():void =>{
        expect(productstore.index()).toBeDefined();
    });

    it('SHOW method should be defined',():void =>{
        expect(productstore.show).toBeDefined();
    });

    it('CREATE method should be defined',():void =>{
        expect(productstore.create).toBeDefined();
    });

    // it('DELETE method should be defined',():void =>{
    //     expect(productstore.delete).toBeDefined();
    // });

    // it('The product is inserted with CREATE method', async() => {
    //     createproduct = await productstore.create(product);
    //     expect(createproduct.product_name).toEqual(product.product_name);
    //     expect(createproduct.price).toEqual(product.price);
    //     expect(createproduct.category).toEqual(product.category);
    // });

    // it('The correct product is returned with SHOW method', async() => {
    //     const showproduct = await productstore.show(createproduct.id as string);
    //     expect(showproduct.id).toEqual(createproduct.id);
    //     expect(showproduct.product_name).toEqual(createproduct.product_name);
    //     expect(showproduct.price).toEqual(createproduct.price);
    //     expect(showproduct.category).toEqual(createproduct.category);
    // });


    // it ('The product is deleted with DELETE method',async() => {
    //     expect(await productstore.delete(createproduct.id as string)).toBeUndefined();
    // });
});