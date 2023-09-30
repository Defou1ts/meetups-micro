import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller()
export class RolesController {
	constructor(private readonly roleSerive: RolesService) {}

	@MessagePattern('roles/create')
	async create(@Payload() dto: CreateRoleDto) {
		return await this.roleSerive.createRole(dto);
	}

	@MessagePattern('roles/getByValue')
	async getByValue(@Payload('value') value: string) {
		return await this.roleSerive.getRoleByValue(value);
	}
}
