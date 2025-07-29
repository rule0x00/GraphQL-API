import { prismaClient } from "../prisma_client";
import { getJwtToken } from "../utils/create_jwt_token";
import { hashPassword } from "../utils/hash_password";
import { validatePassword } from "../utils/validate_password";
import { UUID } from "crypto";
import jwt from 'jsonwebtoken'

export interface userInterface{
    fullName: string
    age?: number;
    email: string;
    profilePic?: string;
    password: string;
    salt: string
}

export interface userPayload {
    password: string;
    email: string
}

export class UserService{
    public static async createUser(user: userInterface){
        const {fullName, age, email, profilePic, password} = user

        const hash = hashPassword(password)
        const salt = hash.salt
        const hashedPassword = hash.hashedPassword
        return await prismaClient.user.create({
            data: {
                fullName,
                email,
                age,
                profilePic,
                salt,
                password: hashedPassword
            }
        })
    }

    public static async signInUser(payload: userPayload){

        const {email, password} = payload
        //Find the user by unique email
        const user = await prismaClient.user.findUnique({where: {email}})

        if(!user) throw new Error("User does not exist")

        const incomingHashedPassword = validatePassword(password, user.salt)

        if(user.password != incomingHashedPassword) throw new Error("Incorrect Password")

        return getJwtToken({id: user.id, fullName: user.fullName, email: user.email})
    }

    public static async decodeToken(token: string){
        return jwt.verify(token, process.env.JWT_SECRET || "abcd")
    }
}

