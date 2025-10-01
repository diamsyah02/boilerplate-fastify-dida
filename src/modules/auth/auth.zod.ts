import { z } from "zod"

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(10),
})