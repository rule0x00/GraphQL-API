import jwt from 'jsonwebtoken'

export async function getJwtToken(payload: any) {
    const token = jwt.sign(payload, process.env.JWT_SECRET || "abcd")
    return token
}