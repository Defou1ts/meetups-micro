import { registerAs } from '@nestjs/config';

import type { ConfigType } from '@nestjs/config';

export const jwtConfigRegister = registerAs('jwt', () => ({
	accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
	refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
}));

export type JwtConfig = ConfigType<typeof jwtConfigRegister>;
