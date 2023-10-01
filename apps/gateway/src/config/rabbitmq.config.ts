import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const rabbitmqConfigRegister = registerAs('postgres', () => ({
	hostname: process.env.RABBIT_MQ_HOST,
	port: Number(process.env.RABBIT_MQ_PORT),
	username: process.env.RABBITMQ_DEFAULT_USER,
	password: process.env.RABBITMQ_DEFAULT_PASS,
}));

export type RabbitMQConfig = ConfigType<typeof rabbitmqConfigRegister>;
