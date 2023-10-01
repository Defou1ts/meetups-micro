import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const appConfigRegister = registerAs('app', () => ({
	host: process.env.HOST,
	port: Number(process.env.PORT),
}));

export type AppConfig = ConfigType<typeof appConfigRegister>;
