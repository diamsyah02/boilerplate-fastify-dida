import type { FastifyRequest, FastifyReply } from "fastify";
import { loginService, registerService } from "./auth.service.ts";
import { authSchema, registerSchema } from "./auth.zod.ts";
import { badRequest, created, success, WebResponse } from "@/utils/WebResponse.ts";
import { mailQueue } from "@/jobs/mailer/queue.ts";

const response = WebResponse;

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = authSchema.parse(request.body);
    const result = await loginService(data);

    if (result.statusCode === badRequest) {
      await mailQueue.add('login-failed-email', {
        to: data.email,
        subject: 'Login Failed',
        text: 'Your login failed. Please try again.',
      });
    }

    return reply.status(success).send(result);
  } catch (err) {
    return reply.status(badRequest).send(response(badRequest, `Invalid data`, null));
  }
};

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = registerSchema.parse(request.body);
    const result = await registerService(data);

    if (result.statusCode === badRequest) {
      await request.server.mailer.sendMail({
        from: process.env.EMAIL_USER, // Jangan lupa `from`
        to: data.email,
        subject: 'Register Failed',
        text: 'Your registration failed. Please try again.',
      });
    }

    return reply.status(created).send(result);
  } catch (err) {
    return reply.status(badRequest).send(response(badRequest, `Invalid data`, null));
  }
};
