import type { FastifyRequest, FastifyReply } from "fastify";
import { loginService, registerService } from "./auth.service.js";
import { authSchema, registerSchema } from "./auth.zod.js";
import { badRequest, created, internalServerError, success, WebResponse } from "../../utils/WebResponse.js";
import { mailQueue } from "../../jobs/mailer/queue.js";

const response = WebResponse;

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = authSchema.parse(request.body);
    let result = await loginService(data);
    if (result.statusCode === success) {
      const token = request.server.jwt.sign({ id: result.data?.id, email: result.data?.email });
      result.data.token = token;
      // await mailQueue.add('login-success-email', {
      //   to: data.email,
      //   subject: 'Login Success',
      //   text: 'Your login was successful. Welcome!',
      // });
    }

    return reply.status(result.statusCode).send(result);
  } catch (err) {
    return reply.status(internalServerError).send(response(internalServerError, `Invalid data`, err, null));
  }
};

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = registerSchema.parse(request.body);
    const result = await registerService(data);

    if (result.statusCode === created || result.statusCode === success) {
      await request.server.mailer.sendMail({
        from: process.env.EMAIL_USER, // Jangan lupa `from`
        to: data.email,
        subject: 'Register Success',
        text: 'Your registration was successful. Welcome!',
      });
    }

    return reply.status(result.statusCode).send(result);
  } catch (err) {
    return reply.status(internalServerError).send(response(internalServerError, `Invalid data`, err, null));
  }
};
