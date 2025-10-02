import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

declare module 'fastify' {
    interface FastifyInstance {
        mailer: Transporter;
    }
}

export default fp(async function (fastify: FastifyInstance) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Optional: verify transporter
    transporter.verify((err: Error | null, success: boolean) => {
        if (err) {
            fastify.log.error(`Mailer error: ${err.message}`);
        } else {
            fastify.log.info('Mailer is ready to send messages');
        }
    });

    fastify.decorate('mailer', transporter);
});
