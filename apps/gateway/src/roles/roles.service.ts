import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { MICROSERVICES_TYPES } from '../services.types';

import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
	constructor(@Inject(MICROSERVICES_TYPES.AUTH_MICROSERVICE) private readonly authMicroserviceClient: ClientProxy) {}

	async createRole(dto: CreateRoleDto) {
		return await firstValueFrom(this.authMicroserviceClient.send('roles/create', dto));
	}

	async getRoleByValue(value: string) {
		const role = await firstValueFrom(this.authMicroserviceClient.send('roles/getByValue', { value }));

		if (!role) throw new NotFoundException();

		return role;
	}
}
