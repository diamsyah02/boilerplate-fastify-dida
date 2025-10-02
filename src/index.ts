import dotenv from 'dotenv';
dotenv.config();
import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import fastifyCompress from '@fastify/compress';
import rootRoute from './routes/root.route.js';
import mailerPlugin from './plugins/mailer.plugin.ts';

const app = Fastify({
  logger: true,
});

// Register security/performance plugins
await app.register(helmet);
await app.register(cors, {
  origin: '*', // sesuaikan untuk production
});
app.register(fastifyCompress);
await app.register(rateLimit, {
  global: true, // Rate limit berlaku global
  max: 200, // Maks 200 request per IP
  timeWindow: '5 minutes', // Dalam 5 menit
  ban: 2, // Kalau lebih dari limit 2 kali, user diblokir
  cache: 10000, // Jumlah IP yang bisa di-cache di memory
  addHeaders: {
    'x-ratelimit-limit': true,
    'x-ratelimit-remaining': true,
    'x-ratelimit-reset': true
  },
  errorResponseBuilder: (req, context) => ({
    statusCode: 429,
    error: 'Too Many Requests',
    message: `You have exceeded the request limit. Try again in ${Math.ceil(context.ttl / 1000)} seconds.`,
  }),
  allowList: ['127.0.0.1'], // IP yang dibebaskan dari limit (misalnya internal)
});

// Register mailer plugin
await app.register(mailerPlugin);

// Register routes
await app.register(rootRoute, { prefix: '/api' });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Server ready at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();