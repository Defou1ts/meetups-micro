import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

import type { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.RMQ,
		options: {
			urls: [
				{
					protocol: 'amqp',
					username: process.env.RABBITMQ_DEFAULT_USER,
					password: process.env.RABBITMQ_DEFAULT_PASS,
					hostname: process.env.RABBIT_MQ_HOST,
					port: Number(process.env.RABBIT_MQ_PORT),
				},
			],
			queue: 'auth_queue',
			queueOptions: {
				durable: false,
			},
		},
	});

	await app.listen();
}
void bootstrap();
