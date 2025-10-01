import type { FastifyRequest, FastifyReply } from "fastify"
import { loginService, registerService } from "./auth.service.ts"
import { authSchema, registerSchema } from "./auth.zod.ts"
import { badRequest, created, success, WebResponse } from "../../utils/WebResponse.ts"

const response = WebResponse

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    const data = authSchema.parse(request.body)
    if (!data) {
        return reply.send(response(badRequest, `Invalid data`, null)).status(badRequest)
    }
    const result = await loginService(data)
    return reply.send(response(success, `Login success`, result)).status(success)
}

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const data = registerSchema.parse(request.body)
    if (!data) {
        return reply.send(response(badRequest, `Invalid data`, null)).status(badRequest)
    }
    const result = await registerService(data)
    return reply.send(response(created, `Register success`, result)).status(created)
}