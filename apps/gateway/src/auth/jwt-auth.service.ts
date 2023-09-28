import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { MICROSERVICES_TYPES } from '../services.types';

import type { CreateUserDto } from '../users/dto/create-user-dto';

@Injectable()
export class JwtAuthService {
	constructor(@Inject(MICROSERVICES_TYPES.AUTH_MICROSERVICE) private readonly authMicroserviceClient: ClientProxy) {}

	async login(dto: CreateUserDto) {
		return await firstValueFrom(this.authMicroserviceClient.send('auth/jwt/login', dto));
	}

	async registration(dto: CreateUserDto) {
		return await firstValueFrom(this.authMicroserviceClient.send('auth/jwt/register', dto));
	}

	async updateAccess(email: string) {
		return await firstValueFrom(this.authMicroserviceClient.send('auth/jwt/updateAccess', { email }));
	}
}
