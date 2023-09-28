import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user-dto';
import { SetRoleDto } from './dto/set-role.dto';
import { UserRoles } from './constants/user-roles';
import { UsersService } from './users.service';
import { RequiredRole } from './decorators/roles-auth.decorator';
import { RolesGuard } from './guards/roles-guard';

import { jwtSwaggerAuthApiHeader } from '../auth/constants/jwt-swagger-auth-header';
import { JwtAuthenticationGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 201 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post()
	async create(@Body() userDto: CreateUserDto) {
		return await this.userService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200 })
	@Get()
	async getAll() {
		return await this.userService.getAllUsers();
	}

	@ApiOperation({ summary: 'Set role' })
	@ApiResponse({ status: 200, type: SetRoleDto })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('role')
	async setRole(@Body() dto: SetRoleDto) {
		return await this.userService.setRole(dto);
	}
}
