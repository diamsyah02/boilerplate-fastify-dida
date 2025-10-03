import dotenv from 'dotenv';
dotenv.config();
import { Redis } from 'ioredis';

const redisConnection = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1', // sesuaikan dengan Server
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || '', // jika ada password
  maxRetriesPerRequest: null
});

export default redisConnection;
