import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtAuthController } from './jwt-auth.controller';
import { JwtAuthService } from './jwt-auth.service';

import { UsersModule } from '../users/users.module';

@Module({
	controllers: [JwtAuthController],
	providers: [JwtAuthService],
	imports: [forwardRef(() => UsersModule), JwtModule.register({})],
	exports: [JwtAuthService, JwtModule],
})
export class JwtAuthModule {}
