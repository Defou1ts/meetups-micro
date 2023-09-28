import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
	providers: [TagsService],
	controllers: [TagsController],
	imports: [JwtModule],
	exports: [],
})
export class TagsModule {}
