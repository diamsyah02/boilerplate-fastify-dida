import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import authRoute from './auth.route.ts';

const rootRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', async (request, reply) => {
    return { message: 'Boilerplate Rest API Fastify menggunakan TypeScript' };
  });

  fastify.get('/protected', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    return { message: 'Ini adalah route yang dilindungi' };
  });

  await fastify.register(authRoute, { prefix: '/api/auth' });
};

export default rootRoute;