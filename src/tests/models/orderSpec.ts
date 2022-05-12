import { Order,OrderStore } from "../../models/order";
  
const orderstore = new OrderStore();
  

describe ('Testing order model', ():void =>{
    

    it('INDEX method should be defined',():void =>{
        expect(orderstore.index()).toBeDefined();
    });

    it('SHOW method should be defined',():void =>{
        expect(orderstore.show).toBeDefined();
    });

    it('CREATE method should be defined',():void =>{
        expect(orderstore.create).toBeDefined();
    });
});