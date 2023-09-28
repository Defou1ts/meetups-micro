import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';

import { MICROSERVICES_TYPES } from '../services.types';

import type { SignUserToMeetupDto } from './dto/sign-user-to-meetup.dto';
import type { AddTagDto } from './dto/add-tag.dto';
import type { UpdateMeetupDto } from './dto/update-meetup.dto';
import type { CreateMeetupDto } from './dto/create-meetup.dto';
import type { MeetupQueryValueType } from './constants/sorts';

@Injectable()
export class MeetupsService {
	constructor(
		@Inject(MICROSERVICES_TYPES.MEETUPS_MICROSERVICE) private readonly meetupsMicroserviceClient: ClientProxy,
	) {}

	async searchMeetupsByName(name: string) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('meetups/searchByName', { name }));
	}

	async getAllMeetups(
		name: string | undefined,
		take: number = 10,
		skip: number = 0,
		sortBy: MeetupQueryValueType = 'ascending',
		latitude?: number,
		longitude?: number,
	) {
		return await firstValueFrom(
			this.meetupsMicroserviceClient.send('meetups/getAll', { name, take, skip, sortBy, latitude, longitude }),
		);
	}

	async getMeetupById(id: number) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('meetups/getById', { id }));
	}

	async createMeetup(dto: CreateMeetupDto) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('meetups/create', dto));
	}

	async updateMeetupById(id: number, dto: UpdateMeetupDto) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('meetups/updateById', { id, dto }));
	}

	async deleteMeetupById(id: number) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('meetups/deleteById', { id }));
	}

	async addTag(dto: AddTagDto) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('meetups/addTag', dto));
	}

	async sign(user: any, dto: SignUserToMeetupDto) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('meetups/sign', { user, dto }));
	}

	async getMeetupsPdfFile() {
		return this.meetupsMicroserviceClient
			.send<Buffer>('meetups/pdf', {})
			.pipe(map((bufferObj) => Buffer.from(bufferObj)));
	}

	async getMeetupsCsvFile() {
		return await firstValueFrom(this.meetupsMicroserviceClient.send<string>('meetups/csv', {}));
	}
}
