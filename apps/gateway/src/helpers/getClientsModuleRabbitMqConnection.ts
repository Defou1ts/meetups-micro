import { Transport } from '@nestjs/microservices';

import { rabbitmqConfigRegister } from '../config/rabbitmq.config';

import type { RabbitMQConfig } from '../config/rabbitmq.config';
import type { ClientsProviderAsyncOptions } from '@nestjs/microservices';
export function getClientsModuleRabbitMqProvider(name: symbol, queue: string): ClientsProviderAsyncOptions {
	return {
		name,
		useFactory: ({ username, password, hostname, port }: RabbitMQConfig) => ({
			name,
			transport: Transport.RMQ,
			options: {
				urls: [
					{
						protocol: 'amqp',
						username,
						password,
						hostname,
						port,
					},
				],
				queue,
				queueOptions: {
					durable: false,
				},
			},
		}),
		inject: [rabbitmqConfigRegister.KEY],
	};
}
