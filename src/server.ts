import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: express.Application = express()
const address: string = "http://localhost:5000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(5000, function () {
    console.log(`starting app on: ${address}`)
})
