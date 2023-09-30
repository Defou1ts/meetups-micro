import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { JwtLoginResponseDto } from './dto/jwt-login-response.dto';
import { JwtAuthService } from './jwt-auth.service';

import { UserParam } from '../users/decorators/user.decorator';
import { CreateUserDto } from '../users/dto/create-user-dto';

@ApiTags('Auth')
@Controller('auth')
export class JwtAuthController {
	constructor(private readonly jwtAuthService: JwtAuthService) {}

	@ApiOperation({ summary: 'Login user' })
	@ApiResponse({ status: 200, type: JwtLoginResponseDto })
	@HttpCode(200)
	@Post('/login')
	async login(@Body() userDto: CreateUserDto) {
		return await this.jwtAuthService.login(userDto);
	}

	@ApiOperation({ summary: 'Register user' })
	@ApiResponse({ status: 201, type: JwtLoginResponseDto })
	@HttpCode(201)
	@Post('/registration')
	async registration(@Body() userDto: CreateUserDto) {
		return await this.jwtAuthService.registration(userDto);
	}

	@ApiOperation({ summary: 'Update user access token' })
	@ApiResponse({ status: 200, type: JwtLoginResponseDto })
	@UseGuards(JwtRefreshTokenGuard)
	@HttpCode(200)
	@Post('/updateAccess')
	async updateAccess(@UserParam() user) {
		return await this.jwtAuthService.getNewAccessAndRefreshToken(user.email);
	}
}
