import type { FastifyPluginAsync } from "fastify"
import { login, register } from "../modules/auth/auth.controller.js";

const authRoute: FastifyPluginAsync = async (app) => {
    app.post('/login', login);
    app.post('/register', register);
}

export default authRoute