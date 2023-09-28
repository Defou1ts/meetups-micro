import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const elasticConfigRegister = registerAs('elastic', () => ({
	username: process.env.ELASTIC_USERNAME,
	password: process.env.ELASTIC_PASSWORD,
	firstNodeHost: process.env.ELASTIC_HOST_FIRST_NODE,
	secondNodeHost: process.env.ELASTIC_HOST_SECOND_NODE,
	thirdNodeHost: process.env.ELASTIC_HOST_THIRD_NODE,
	port: process.env.ELASTIC_PORT,
}));

export type ElasticConfig = ConfigType<typeof elasticConfigRegister>;
