import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Meetup } from '@models';

import { meetupSortTypes } from './constants/sorts';

import { geoDistance } from '../helpers/getGeodistance';

import type { MeetupQueryValueType } from './constants/sorts';
import type { CreateMeetupDto } from './dto/create-meetup.dto';

@Injectable()
export class MeetupsRepository {
	constructor(@InjectModel(Meetup) private readonly meetupsModel: typeof Meetup) {}

	async getByPrimaryKey(id: number) {
		return await this.meetupsModel.findByPk(id);
	}

	async create(dto: CreateMeetupDto) {
		return await this.meetupsModel.create(dto);
	}

	async getAll() {
		return await this.meetupsModel.findAll();
	}

	async getAllByParams(
		name: string | undefined,
		take: number = 10,
		skip: number = 0,
		sortBy: MeetupQueryValueType,
		latitude?: number,
		longitude?: number,
	) {
		const sortType = meetupSortTypes[sortBy];

		const whereCondition = name ? { name: { [Op.like]: `%${name.toLowerCase()}%` } } : {};

		const meetups = await this.meetupsModel.findAll({
			where: whereCondition,
			limit: take,
			offset: skip,
			order: [['name', sortType]],
		});

		if (latitude && longitude) {
			return meetups.filter(
				(meetup) => geoDistance(latitude, longitude, meetup.latitude, meetup.longitude) < 1000000,
			);
		}

		return meetups;
	}
}
