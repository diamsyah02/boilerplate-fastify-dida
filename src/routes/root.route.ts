import type { FastifyPluginAsync } from 'fastify';

const rootRoute: FastifyPluginAsync = async (app) => {
  app.get('/', async (request, reply) => {
    return { message: 'Boilerplate Rest API Fastify menggunakan TypeScript' };
  });
};

export default rootRoute;