import { Order,OrderStore } from "../../models/order";
// import { User,UserStore } from "../../models/user";

// const userstore = new UserStore();
// let user: User;
// let createuser: User;

const order:Order = {
    order_status: 'in progress',
    user_id: '1'
  }
  
  const orderstore = new OrderStore();
  

// let order: Order;
// let createorder: Order;

describe ('Testing order model', ():void =>{
    
    // beforeAll(() => {
    //     order = {
    //         order_status: 'in progress',
    //         user_id: '1'
    //     },
    //     user = {
    //         firstname: 'Andy',
    //         lastname: 'Sam',
    //         password_digest: 'password123'
    //     }
    // });

    it('INDEX method should be defined',():void =>{
        expect(orderstore.index()).toBeDefined();
    });

    it('SHOW method should be defined',():void =>{
        expect(orderstore.show).toBeDefined();
    });

    it('CREATE method should be defined',():void =>{
        expect(orderstore.create).toBeDefined();
    });

    it('DELETE method should be defined',():void =>{
        expect(orderstore.delete).toBeDefined();
    });

    // it('The order is inserted with CREATE method', async() => {
    //     createuser = await userstore.create(user);
    //     order.user_id = createuser.id as string;
    //     createorder = await orderstore.create(order);
    //     expect(createorder.order_status).toEqual(order.order_status);
    //     expect(createorder.user_id).toEqual(order.user_id.toString());
    // });


    // it ('The order is deleted with DELETE method',async() => {
    //     expect(await orderstore.delete(createorder.id as string)).toBeUndefined();
    // });

    // afterAll(async()=>{
    //     await userstore.delete(createuser.id as string);
    // })
});