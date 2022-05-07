import { DashboardQueries } from '../../services/dashboard'

const dashboard = new DashboardQueries();

describe ('Testing Dashboard Service', ():void =>{
    it('topFivePopularProducts method should be defined',():void =>{
        expect(dashboard.topFivePopularProducts()).toBeDefined();
    });

    it('productsByCategory method should be defined',():void =>{
        expect(dashboard.productsByCategory).toBeDefined();
    });

    it('completedOrders method should be defined',():void =>{
        expect(dashboard.completedOrders).toBeDefined();
    });

});