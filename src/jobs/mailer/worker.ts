import { Worker } from 'bullmq';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import type { EmailJobData } from './type.js';
import redisConnection from '../../configs/redis/index.js';

dotenv.config();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const worker = new Worker<EmailJobData>(
  'mail-queue',
  async job => {
    const { to, subject, text } = job.data;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log(`📧 Email sent to ${to}`);
  },
  {
    connection: redisConnection,
    concurrency: 5,
    autorun: true,
  }
);

worker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});
