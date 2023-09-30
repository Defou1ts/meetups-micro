import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { MICROSERVICES_TYPES } from '../services.types';

import type { CreateUserDto } from './dto/create-user-dto';
import type { SetRoleDto } from './dto/set-role.dto';

@Injectable()
export class UsersService {
	constructor(
		@Inject(MICROSERVICES_TYPES.USERS_MICROSERVICE) private readonly usersMicroserviceClient: ClientProxy,
	) {}

	async createUser(dto: CreateUserDto) {
		return await firstValueFrom(this.usersMicroserviceClient.send('users/create', dto));
	}

	async getAllUsers() {
		return await firstValueFrom(this.usersMicroserviceClient.send('users/getAll', {}));
	}

	async getUserByEmail(email: string) {
		return await firstValueFrom(this.usersMicroserviceClient.send('users/getByEmail', { email }));
	}

	async setRole(dto: SetRoleDto) {
		return await firstValueFrom(this.usersMicroserviceClient.send('users/setRole', dto));
	}

	async updateUserRefreshTokenByEmail(refreshToken: string, email: string) {
		return await firstValueFrom(this.usersMicroserviceClient.send('users/updateRefresh', { refreshToken, email }));
	}
}
