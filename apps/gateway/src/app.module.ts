import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { MeetupsModule } from './meetups/meetups.module';
import { TagsModule } from './tags/tags.module';
import { jwtConfigRegister } from './config/jwt.config';
import { appConfigRegister } from './config/app.config';
import { rabbitmqConfigRegister } from './config/rabbitmq.config';
import { MICROSERVICES_TYPES } from './services.types';
import { getClientsModuleRabbitMqProvider } from './helpers/getClientsModuleRabbitMqConnection';
import { OauthModule } from './oauth/oauth.module';
import { googleConfigRegister } from './config/google.config';

@Module({
	imports: [
		ClientsModule.registerAsync({
			isGlobal: true,
			clients: [
				getClientsModuleRabbitMqProvider(MICROSERVICES_TYPES.AUTH_MICROSERVICE, 'auth_queue'),
				getClientsModuleRabbitMqProvider(MICROSERVICES_TYPES.MEETUPS_MICROSERVICE, 'meetups_queue'),
			],
		}),

		ConfigModule.forRoot({
			isGlobal: true,
			load: [jwtConfigRegister, appConfigRegister, rabbitmqConfigRegister, googleConfigRegister],
		}),
		UsersModule,
		RolesModule,
		JwtAuthModule,
		MeetupsModule,
		TagsModule,
		OauthModule,
	],
})
export class AppModule {}
