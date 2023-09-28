import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MeetupsController } from './meetups.controller';
import { MeetupsService } from './meetups.service';

@Module({
	providers: [MeetupsService],
	controllers: [MeetupsController],
	imports: [JwtModule],
})
export class MeetupsModule {}
