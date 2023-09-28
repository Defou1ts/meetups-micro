import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

import { jwtSwaggerAuthApiHeader } from '../auth/constants/jwt-swagger-auth-header';
import { JwtAuthenticationGuard } from '../auth/guards/jwt-auth.guard';
import { UserRoles } from '../users/constants/user-roles';
import { RequiredRole } from '../users/decorators/roles-auth.decorator';
import { RolesGuard } from '../users/guards/roles-guard';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
	constructor(private readonly roleSerive: RolesService) {}

	@ApiOperation({ summary: 'Create user role' })
	@ApiResponse({ status: 201 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post()
	async create(@Body() dto: CreateRoleDto) {
		return await this.roleSerive.createRole(dto);
	}

	@ApiOperation({ summary: 'Get role by value' })
	@ApiResponse({ status: 200 })
	@Get('/:value')
	async getByValue(@Param('value') value: string) {
		return await this.roleSerive.getRoleByValue(value);
	}
}
