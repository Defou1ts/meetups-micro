import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { Role, User } from '@models';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';

@Module({
	providers: [RolesService, RolesRepository],
	controllers: [RolesController],
	imports: [SequelizeModule.forFeature([Role, User]), JwtModule],
	exports: [RolesService],
})
export class RolesModule {}
