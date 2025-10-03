import { Queue } from 'bullmq';
import type { EmailJobData } from './type.js';
import redisConnection from '../../configs/redis/index.js';

export const mailQueue = new Queue<EmailJobData>('mail-queue', {
  connection: redisConnection,
});