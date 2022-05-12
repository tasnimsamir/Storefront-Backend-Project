import { User,UserStore } from "../../models/user";
import TestUser from "../handlers/aUsersSpec";
import bcrypt from 'bcrypt';

const userstore = new UserStore();
let user: User;

const pepper = process.env.BCRYPT_PASSWORD as string;


describe ('Testing user model', ():void =>{

    beforeAll(() => {
        user = {
            firstname: 'Andy',
            lastname: 'Sam',
            password_digest: 'password123'
        }
    });

    it('INDEX method should be defined',():void =>{
        expect(userstore.index()).toBeDefined();
    });

    it('SHOW method should be defined',():void =>{
        expect(userstore.show).toBeDefined();
    });

    it('CREATE method should be defined',():void =>{
        expect(userstore.create).toBeDefined();
    });

    it('The user is inserted with CREATE method and password is encrypted and hashed', async() => {
        
        expect((await TestUser).testUser.firstname).toEqual(user.firstname);
        expect((await TestUser).testUser.lastname).toEqual(user.lastname);
        const hashedpass = bcrypt.compareSync(
            user.password_digest + pepper,
            (await TestUser).testUser.password_digest as string
        );
        expect(hashedpass).toBeTruthy();
    });
});

