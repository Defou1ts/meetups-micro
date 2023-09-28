import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';

import { GoogleAuthGuard } from './guards/google-auth.guard';
import { OAuthService } from './oauth.service';

import { UserParam } from '../users/decorators/user.decorator';

@Controller('oauth')
export class OAuthController {
	constructor(private readonly oauthService: OAuthService) {}

	@Get('google')
	@UseGuards(GoogleAuthGuard)
	async googleAuth(@Req() req: Request) {}

	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	async googleAuthRedirect(@UserParam() user: any) {
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
