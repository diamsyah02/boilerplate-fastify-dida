import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import type { EmailJobData } from './type.ts';

const connection = new Redis();

export const mailQueue = new Queue<EmailJobData>('mail-queue', {
  connection,
});