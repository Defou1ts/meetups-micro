import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
	providers: [RolesService],
	controllers: [RolesController],
	imports: [JwtModule],
	exports: [],
})
export class RolesModule {}
