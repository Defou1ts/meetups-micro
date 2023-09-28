import { Injectable, NotFoundException } from '@nestjs/common';

import { RolesRepository } from './roles.repository';

import { UserRoles } from '../users/constants/user-roles';

import type { OnModuleInit } from '@nestjs/common';
import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService implements OnModuleInit {
	constructor(private readonly rolesRepository: RolesRepository) {}

	async onModuleInit() {
		const userRole = await this.rolesRepository.getByValue(UserRoles.USER);
		const organizerRole = await this.rolesRepository.getByValue(UserRoles.USER);

		if (!userRole) {
			await this.createRole({
				value: UserRoles.USER,
				description: 'User of meetups',
			});
		}

		if (!organizerRole) {
			await this.createRole({
				value: UserRoles.ORGANIZER,
				description: 'Organizer of meetups',
			});
		}
	}

	async createRole(dto: CreateRoleDto) {
		const role = await this.rolesRepository.create(dto);
		return role;
	}

	async getRoleByValue(value: string) {
		const role = await this.rolesRepository.getByValue(value);

		if (!role) throw new NotFoundException();

		return role;
	}
}
