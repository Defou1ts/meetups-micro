import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { MICROSERVICES_TYPES } from '../services.types';

import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
	constructor(
		@Inject(MICROSERVICES_TYPES.USERS_MICROSERVICE) private readonly usersMicroserviceClient: ClientProxy,
	) {}

	async createRole(dto: CreateRoleDto) {
		return await firstValueFrom(this.usersMicroserviceClient.send('roles/create', dto));
	}

	async getRoleByValue(value: string) {
		const role = await firstValueFrom(this.usersMicroserviceClient.send('roles/getByValue', { value }));

		if (!role) throw new NotFoundException();

		return role;
	}
}
