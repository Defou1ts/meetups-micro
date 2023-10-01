import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
	@IsString()
	ELASTIC_USERNAME: string;

	ELASTIC_PASSWORD: string;
	@IsString()
	ELASTIC_HOST_FIRST_NODE: string;

	@IsString()
	ELASTIC_HOST_SECOND_NODE: string;

	@IsString()
	ELASTIC_HOST_THIRD_NODE: string;

	@IsNumber()
	ELASTIC_PORT: number;

	@IsString()
	POSTGRES_HOST: string;

	@IsNumber()
	POSTGRES_PORT: number;

	@IsString()
	POSTGRES_USER: string;

	@IsString()
	POSTGRES_PASSWORD: string;

	@IsString()
	POSTGRES_DB: string;

	@IsString()
	RABBIT_MQ_HOST: string;

	@IsNumber()
	RABBIT_MQ_PORT: number;

	@IsString()
	RABBITMQ_DEFAULT_USER: string;

	@IsString()
	RABBITMQ_DEFAULT_PASS: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}
