import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_FILTER } from '@nestjs/core';

import { Meetup, MeetupTags, Role, Tag, User, UserMeetups } from '@models';

import { postgresConfigRegister } from './config/postgres.config';
import { jwtConfigRegister } from './config/jwt.config';
import { encryptionConfigRegister } from './config/encryption.config';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { HttpExceptionFilter } from './exceptions/rpc.exception.filter';

import type { PostgresConfig } from './config/postgres.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [postgresConfigRegister, jwtConfigRegister, encryptionConfigRegister],
		}),
		SequelizeModule.forRootAsync({
			inject: [postgresConfigRegister.KEY],
			useFactory: ({ host, port, username, password, database }: PostgresConfig) => ({
				dialect: 'postgres',
				host,
				port,
				username,
				password,
				database,
				models: [User, Role, Meetup, Tag, MeetupTags, UserMeetups],
				autoLoadModels: true,
			}),
		}),
		UsersModule,
		RolesModule,
		JwtAuthModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule {}