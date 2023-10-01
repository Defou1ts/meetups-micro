import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';

import { User, Role, Meetup, Tag, MeetupTags, UserMeetups } from '@models';

import { elasticConfigRegister } from './config/elastic.config';
import { postgresConfigRegister } from './config/postgres.config';
import { CsvModule } from './csv/csv.module';
import { HttpExceptionFilter } from './exceptions/rpc.exception.filter';
import { MeetupsModule } from './meetups/meetups.module';
import { TagsModule } from './tags/tags.module';
import { validate } from './config/env.validation';

import type { PostgresConfig } from './config/postgres.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate,
			isGlobal: true,
			load: [postgresConfigRegister, elasticConfigRegister],
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
		TagsModule,
		MeetupsModule,
		CsvModule,
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
