import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const rabbitmqConfigRegister = registerAs('postgres', () => ({
	host: process.env.RABBIT_MQ_HOST || 'rabbit',
	port: Number(process.env.RABBIT_MQ_PORT) || 5672,
	username: process.env.RABBITMQ_DEFAULT_USER || 'admin',
	password: process.env.RABBITMQ_DEFAULT_PASS || 'admin',
}));

export type RabbitMQConfig = ConfigType<typeof rabbitmqConfigRegister>;
