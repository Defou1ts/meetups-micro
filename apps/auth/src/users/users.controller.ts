import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { SetRoleDto } from './dto/set-role.dto';

@Controller()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@MessagePattern('users/create')
	async create(@Payload() userDto: CreateUserDto) {
		return await this.usersService.createUser(userDto);
	}

	@MessagePattern('users/getAll')
	async getAll() {
		return await this.usersService.getAllUsers();
	}

	@MessagePattern('users/getByEmail')
	async getByEmail(@Payload('email') email: string) {
		return await this.usersService.getUserByEmail(email);
	}

	@MessagePattern('users/setRole')
	async setRole(@Payload() dto: SetRoleDto) {
		return await this.usersService.setRole(dto);
	}
}
