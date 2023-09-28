import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';

import { MeetupTags } from './meetup-tags';
import { Meetup } from './meetups.model';

import type { User } from './users.model';

interface TagCreationAttrs {
	name: string;
}

@Table({ tableName: 'tag' })
export class Tag extends Model<Tag, TagCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	name: string;

	@BelongsToMany(() => Meetup, () => MeetupTags)
	meetups: User[];
}
