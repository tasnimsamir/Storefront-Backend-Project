import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './handlers/users'

const app: express.Application = express()
const address: string = "http://localhost:8000"

app.use(bodyParser.json())
userRoutes(app)

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(8000, function () {
    console.log(`starting app on: ${address}`)
})
