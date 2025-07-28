import { createHmac, randomBytes } from "node:crypto";

export function validatePassword(password: string, salt: string) {
    const hashedPassword = createHmac("sha256", salt).update(password).digest('hex')
    return hashedPassword
}