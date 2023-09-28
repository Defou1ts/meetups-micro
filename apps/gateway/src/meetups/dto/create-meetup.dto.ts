import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateMeetupDto {
	@ApiProperty({ example: 'GraphQL', description: 'Meetup name' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'Node js microservices review', description: 'Meetup description' })
	@IsString()
	description: string;

	@ApiProperty({ example: 12.23492349823, description: 'Latitude part of meetup geolocation' })
	@IsNumber()
	latitude: number;

	@ApiProperty({ example: 12.23492349823, description: 'Longitude part of meetup geolocation' })
	@IsNumber()
	longitude: number;

	@ApiProperty({ example: 'Date example', description: 'Meetup Date' })
	@IsDateString()
	date: Date;
}
