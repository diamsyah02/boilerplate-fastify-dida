import { Redis } from 'ioredis';

const redisConnection = new Redis({
  host: '127.0.0.1', // sesuaikan dengan Server
  port: 6379,
  // password: 'your_redis_password', // jika ada password
});

export default redisConnection;
