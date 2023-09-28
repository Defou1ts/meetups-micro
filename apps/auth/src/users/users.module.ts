import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User, Role } from '@models';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

import { RolesModule } from '../roles/roles.module';
import { JwtAuthModule } from '../auth/jwt-auth.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	imports: [SequelizeModule.forFeature([User, Role]), RolesModule, forwardRef(() => JwtAuthModule)],
	exports: [UsersService],
})
export class UsersModule {}
