import express from 'express'
import dotenv from 'dotenv'
import init_graphql, {graphql_server} from './graphql/graphql_server';
import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors';
import { UserService } from './services/user';

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
    app.use("/graphql", expressMiddleware(graphql_server, {context: async ({req}) => {
        try{
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return {}; // unauthenticated context
        }

        const token = authHeader.split(' ')[1];
        console.log(token)
        if (!token) {
            return {}; // or throw a GraphQLError if all routes are protected
        }


         const user = UserService.decodeToken(token)
            return {user}
        }catch(error){
            return {}
        }
    }}))


    //Listen to the server
    app.listen(PORT, ()=>{console.log(`Server is running on Port: ${PORT}`)})
}

start_server()