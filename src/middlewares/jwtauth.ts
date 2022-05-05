import { Request, Response } from 'express'
import jwt from'jsonwebtoken'

const { TOKEN_SECRET } = process.env;
const secretToken = TOKEN_SECRET;

const verifyAuthToken=(req:Request,res:Response,next:Function) :Response | void =>{

    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, secretToken as string)
        next()
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
    }

}


export default verifyAuthToken;