import { Worker } from 'bullmq';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import type { EmailJobData } from './type.ts';

dotenv.config();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const worker = new Worker<EmailJobData>(
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
    connection: {
      host: '127.0.0.1',
      port: 6379,
    },
  }
);

worker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});
