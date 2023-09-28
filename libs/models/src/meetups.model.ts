import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';

import { UserMeetups } from './user-meetups.model';
import { Tag } from './tags.model';
import { MeetupTags } from './meetup-tags';
import { User } from './users.model';

interface MeetupCreationAttrs {
	name: string;
	description: string;
	latitude: number;
	longitude: number;
	date: Date;
}

@Table({ tableName: 'meetups' })
export class Meetup extends Model<Meetup, MeetupCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	name: string;

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	description: string;

	@Column({ type: DataType.DOUBLE, unique: false, allowNull: false })
	latitude: number;

	@Column({ type: DataType.DOUBLE, unique: false, allowNull: false })
	longitude: number;

	@Column({ type: DataType.DATE, unique: false, allowNull: false })
	date: Date;

	@BelongsToMany(() => Tag, () => MeetupTags)
	tags: Tag[];

	@BelongsToMany(() => User, () => UserMeetups)
	users: User[];
}
