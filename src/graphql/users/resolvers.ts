import { UserService, userInterface, userPayload } from "../../services/user"
import { GraphQLError } from 'graphql';
//Mutations Resolvers
const mutations = {
    createUser: async(_:any, user:userInterface)=>{

        const res = await UserService.createUser(user)
        console.log(res)
        return res.password
    }
}

//Queries Resolvers
const queries = {
    signInUser: async(_:any, payload: userPayload, context: any) => {

        if (!context.user){
            throw new GraphQLError("You are not authenticated", {
                extensions: { code: "UNAUTHENTICATED" },
            })
        }

        const token = await UserService.signInUser(payload)
        console.log("token is: ", token)
        return token
    }
}


export const resolvers = {queries, mutations}