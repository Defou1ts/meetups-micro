import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SequelizeModule } from '@nestjs/sequelize';

import { Meetup, Tag, MeetupTags, User, UserMeetups } from '@models';

import { MeetupsSearchService } from './meetups-search.service';
import { MeetupsController } from './meetups.controller';
import { MeetupsRepository } from './meetups.repository';
import { MeetupsService } from './meetups.service';

import { TagsModule } from '../tags/tags.module';
import { PdfModule } from '../pdf/pdf.module';
import { CsvModule } from '../csv/csv.module';
import { elasticConfigRegister } from '../config/elastic.config';

import type { ElasticConfig } from '../config/elastic.config';

@Module({
	providers: [MeetupsService, MeetupsRepository, MeetupsSearchService],
	controllers: [MeetupsController],
	imports: [
		PdfModule,
		CsvModule,
		SequelizeModule.forFeature([Meetup, Tag, MeetupTags, User, UserMeetups]),
		TagsModule,
		ElasticsearchModule.registerAsync({
			useFactory({ firstNodeHost, secondNodeHost, thirdNodeHost, port, username, password }: ElasticConfig) {
				return {
					auth: { username, password },
					nodes: [
						`http://${firstNodeHost}:${port}`,
						`http://${secondNodeHost}:${port}`,
						`http://${thirdNodeHost}:${port}`,
					],
				};
			},
			inject: [elasticConfigRegister.KEY],
		}),
	],
})
export class MeetupsModule {}
