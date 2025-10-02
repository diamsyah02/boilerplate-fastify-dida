import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { login, register } from "../modules/auth/auth.controller.js";

const authRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post('/login', login);
    fastify.post('/register', register);
}

export default authRoute