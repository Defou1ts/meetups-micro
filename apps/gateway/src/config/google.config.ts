import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const googleConfigRegister = registerAs('google', () => ({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));

export type GoogleConfig = ConfigType<typeof googleConfigRegister>;
