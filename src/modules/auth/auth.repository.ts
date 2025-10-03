import { eq } from "drizzle-orm";
import { db } from "../../configs/db/index.js"
import type { AuthLogin, AuthRegister } from "./auth.type.js"
import { usersTable } from "../../configs/db/schema_table/users.js"

export const loginRepository = async (data: AuthLogin) => {
    try {
        const result = await db.select().from(usersTable).where(eq(usersTable.email, data.email));
        if (result.length === 0) return null
        return result[0]
    } catch (err) {
        throw err
    }
}

export const registerRepository = async (data: AuthRegister) => {
    try {
        const result = await db.insert(usersTable).values({
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
        })
        return result
    } catch (err) {
        throw err
    }
}
