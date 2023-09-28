import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

import { jwtSwaggerAuthApiHeader } from '../auth/constants/jwt-swagger-auth-header';
import { JwtAuthenticationGuard } from '../auth/guards/jwt-auth.guard';
import { UserRoles } from '../users/constants/user-roles';
import { RequiredRole } from '../users/decorators/roles-auth.decorator';
import { RolesGuard } from '../users/guards/roles-guard';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@ApiOperation({ summary: 'Create tag for meetup' })
	@ApiResponse({ status: 201 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post('create')
	async create(@Body() dto: CreateTagDto) {
		return await this.tagsService.createTag(dto);
	}

	@ApiOperation({ summary: 'Get all meetups tags' })
	@ApiResponse({ status: 200 })
	@Get()
	async getAll() {
		return await this.tagsService.getAllTags();
	}
}
