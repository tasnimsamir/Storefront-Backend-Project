import { Order,OrderStore } from "../../models/order";

const orderstore = new OrderStore();
let order: Order;
// let createorder: Order;


describe ('Testing order model', ():void =>{
    
    beforeAll(() => {
        order = {
            order_status: 'in progress',
            user_id: '2'
        }
    });


    // it('INDEX method returns a list', async() => {
    //     expect((await orderstore.index()).length).toBeGreaterThanOrEqual(0);
    // });

    // it('The order is inserted with CREATE method', async() => {
    //     createorder = await orderstore.create(order);
    //     expect(createorder.order_status).toEqual(order.order_status);
    //     expect(createorder.user_id).toEqual(order.user_id);
    // });

    it('SHOW method by user id returns a list', async() => {
        expect((await orderstore.show(order.user_id)).length).toBeGreaterThanOrEqual(0);
    });

    // it('The correct order is returned with SHOW method', async() => {
    //     const showorder = await orderstore.showorderbyid(createorder.id as string);
    //     expect(showorder.id).toEqual(createorder.id);
    //     expect(showorder.order_status).toEqual(createorder.order_status);
    //     expect(showorder.user_id).toEqual(createorder.user_id);
    // });


    // it ('The order is deleted with DELETE method',async() => {
    //     expect(await orderstore.delete(createorder.id as string)).toBeUndefined();
    // });

    // it('INDEX method should be defined',():void =>{
    //     expect(orderstore.index()).toBeDefined();
    // });

    it('SHOW method should be defined',():void =>{
        expect(orderstore.show).toBeDefined();
    });

    // it('CREATE method should be defined',():void =>{
    //     expect(orderstore.create).toBeDefined();
    // });

    // it('DELETE method should be defined',():void =>{
    //     expect(orderstore.delete).toBeDefined();
    // });

});