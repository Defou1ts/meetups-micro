import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
	@IsString()
	HOST: string;

	@IsNumber()
	PORT: number;

	@IsString()
	RABBIT_MQ_HOST: string;

	@IsNumber()
	RABBIT_MQ_PORT: number;

	@IsString()
	RABBITMQ_DEFAULT_USER: string;

	@IsString()
	RABBITMQ_DEFAULT_PASS: string;

	@IsString()
	GOOGLE_CLIENT_ID: string;

	@IsString()
	GOOGLE_CLIENT_SECRET: string;

	@IsString()
	JWT_ACCESS_TOKEN_SECRET: string;

	@IsNumber()
	JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;

	@IsString()
	JWT_REFRESH_TOKEN_SECRET: string;

	@IsNumber()
	JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}
