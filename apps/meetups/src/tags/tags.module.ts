import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Meetup, Tag, MeetupTags } from '@models';

import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { TagsService } from './tags.service';

@Module({
	providers: [TagsService, TagsRepository],
	controllers: [TagsController],
	imports: [SequelizeModule.forFeature([Meetup, Tag, MeetupTags])],
	exports: [TagsService],
})
export class TagsModule {}
