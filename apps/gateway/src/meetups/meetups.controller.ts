import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { Response } from 'express';

import { MeetupQueryValueType } from './constants/sorts';
import { SignUserToMeetupDto } from './dto/sign-user-to-meetup.dto';
import { AddTagDto } from './dto/add-tag.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { MeetupsService } from './meetups.service';

import { jwtSwaggerAuthApiHeader } from '../auth/constants/jwt-swagger-auth-header';
import { JwtAuthenticationGuard } from '../auth/guards/jwt-auth.guard';
import { UserRoles } from '../users/constants/user-roles';
import { RequiredRole } from '../users/decorators/roles-auth.decorator';
import { UserParam } from '../users/decorators/user.decorator';
import { RolesGuard } from '../users/guards/roles-guard';

@ApiTags('Meetups')
@Controller('meetups')
export class MeetupsController {
	constructor(private readonly meetupsService: MeetupsService) {}

	@ApiOperation({ summary: 'Get all meetups' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Get('search')
	async searchByName(@Query('name') name: string = '') {
		return await this.meetupsService.searchMeetupsByName(name);
	}

	@ApiOperation({ summary: 'Get all meetups' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Get()
	async getAll(
		@Query('name') name: string,
		@Query('take') take: number,
		@Query('skip') skip: number,
		@Query('sort_by') sortBy: MeetupQueryValueType,
		@Query('latitude') latitude: number,
		@Query('longitude') longitude: number,
	) {
		return await this.meetupsService.getAllMeetups(name, take, skip, sortBy, latitude, longitude);
	}

	@ApiOperation({ summary: 'Get meetup by id' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Get('byId/:id')
	async getById(@Param('id', new ParseIntPipe()) id: number) {
		return await this.meetupsService.getMeetupById(id);
	}

	@ApiOperation({ summary: 'Create meetup' })
	@ApiResponse({ status: 201 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post('create')
	async create(@Body() dto: CreateMeetupDto) {
		return await this.meetupsService.createMeetup(dto);
	}

	@ApiOperation({ summary: 'Update meetup by id' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch(':id')
	async updateById(@Param('id', new ParseIntPipe()) id: number, @Body() dto: UpdateMeetupDto) {
		return await this.meetupsService.updateMeetupById(id, dto);
	}

	@ApiOperation({ summary: 'Delete meetup by id' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Delete(':id')
	async deleteById(@Param('id', new ParseIntPipe()) id: number) {
		return await this.meetupsService.deleteMeetupById(id);
	}

	@ApiOperation({ summary: 'Add tag to meetup' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('addTag')
	async addTag(@Body() dto: AddTagDto) {
		return await this.meetupsService.addTag(dto);
	}

	@ApiOperation({ summary: 'Sign user to meetup' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Patch('sign')
	async sign(@UserParam() user: any, @Body() dto: SignUserToMeetupDto) {
		return await this.meetupsService.sign(user, dto);
	}

	@ApiOperation({ summary: 'Get meetups pdf' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Get('pdf')
	async getPdf(@Res() res: Response) {
		const pdfObservable = await this.meetupsService.getMeetupsPdfFile();

		pdfObservable.subscribe((bufferObj) => {
			const buffer = Buffer.from(bufferObj);

			res.set({
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename=example.pdf',
				'Content-Length': buffer.length,
			});

			res.end(buffer);
		});
	}

	@Header('Content-Type', 'text/csv')
	@Header('Content-Disposition', 'attachment; filename=data.csv')
	@ApiOperation({ summary: 'Get meetups csv' })
	@ApiResponse({ status: 200 })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@UseGuards(JwtAuthenticationGuard)
	@Get('csv')
	async getCsv() {
		const csvString = await this.meetupsService.getMeetupsCsvFile();
		return csvString;
	}
}
