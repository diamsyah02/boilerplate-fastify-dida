import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { WebResponse } from '../utils/WebResponse.js';

declare module 'fastify' {
  interface FastifyInstance {
    jwt: jwt.JWT
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default fp(async function (fastify: FastifyInstance) {
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET || 'supersecret',
    });

    // Optional: Tambah decorator auth
    fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(WebResponse(401, 'Unauthorized', err, null));
        }
    });
});
