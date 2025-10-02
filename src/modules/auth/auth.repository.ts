import { eq } from "drizzle-orm";
import { db } from "@/configs/db/index.ts"
import type { AuthLogin, AuthRegister } from "./auth.type.ts"
import { usersTable } from "@/configs/db/schema_table/users.ts"

export const loginRepository = async (data: AuthLogin) => {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, data.email));
    if (result.length === 0) return null
    return result[0]
}

export const registerRepository = async (data: AuthRegister) => {
    const result = await db.insert(usersTable).values(data)
    return result
}
