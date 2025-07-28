import { ApolloServer } from '@apollo/server'
import { User } from './users/user'

//Initialize the apollo server
export const graphql_server = new ApolloServer({
    //Schema
    typeDefs: `
        type Query {
            ${User.queries}
        }
        type Mutation {
            ${User.mutations}
        }
    `, 

    //Executable function
    resolvers: {
        Query: {
            ...User.resolvers.queries
        },
        Mutation: {
            ...User.resolvers.mutations
        }
    } 
})

//We need this function to await graphql_server.start() because it runs asynchronously or we can use top level await
const init_graphql = async () =>{
    //Start the server
    await graphql_server.start()
    return graphql_server
}

export default init_graphql