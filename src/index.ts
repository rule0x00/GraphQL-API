import express from 'express'
import dotenv from 'dotenv'
import init_graphql, {graphql_server} from './graphql/graphql_server';
import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors';

dotenv.config()

const app = express()

//Allow all origins
app.use(cors())

app.use(express.json()) //allow all json requests

const PORT = Number(process.env.PORT) || 3000


const start_server = async () => {
    //Awaiting GQL server to be start
    await init_graphql()

    //Normal route
    app.get("/", (req, res)=>{})

    // The Graphql route listens to GQL server
    app.use("/graphql", expressMiddleware(graphql_server))


    //Listen to the server
    app.listen(PORT, ()=>{console.log(`Server is running on Port: ${PORT}`)})
}



start_server()