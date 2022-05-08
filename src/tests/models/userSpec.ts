import { User,UserStore } from "../../models/user";
import bcrypt from 'bcrypt';

const userstore = new UserStore();
let user: User;
let createuser: User;

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

    it('DELETE method should be defined',():void =>{
        expect(userstore.delete).toBeDefined();
    });

    it('AUTHENTICATE method should be defined',():void =>{
        expect(userstore.authenticate).toBeDefined();
    });

    it('The user is inserted with CREATE method and password is encrypted and hashed', async() => {
        createuser = await userstore.create(user);
        expect(createuser.firstname).toEqual(user.firstname);
        expect(createuser.lastname).toEqual(user.lastname);
        const hashedpass = bcrypt.compareSync(
            user.password_digest + pepper,
            createuser.password_digest as string
        )
        expect(hashedpass).toBeTruthy();
    });


    it('The correct user is returned with SHOW method', async() => {
        const showuser = await userstore.show(createuser.id as string);
        expect(showuser.id).toEqual(createuser.id);
        expect(showuser.firstname).toEqual(createuser.firstname);
        expect(showuser.lastname).toEqual(createuser.lastname);
        expect(showuser.password_digest).toEqual(createuser.password_digest);
    });


    it ('The user is deleted with DELETE method',async() => {
        expect(await userstore.delete(createuser.id as string)).toBeUndefined();
    });

    

});

