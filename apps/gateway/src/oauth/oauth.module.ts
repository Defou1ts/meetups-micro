import { Module } from '@nestjs/common';

import { OAuthService } from './oauth.service';
import { OAuthController } from './oauth.controller';
import { GoogleStrategy } from './strategies/google-auth.strategy';

@Module({
	providers: [OAuthService, GoogleStrategy],
	controllers: [OAuthController],
})
export class OauthModule {}
