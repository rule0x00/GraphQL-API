import { createHmac, randomBytes } from "node:crypto";

export function hashPassword(password: string) {
    const salt = randomBytes(32).toString()
    const hashedPassword = createHmac("sha256", salt).update(password).digest('hex')
    return {
        hashedPassword: hashedPassword,
        salt: salt
    }
}