import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Role } from './roles.model';
import { Meetup } from './meetups.model';
import { UserMeetups } from './user-meetups.model';

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@Column({ type: DataType.STRING })
	hashedRefreshToken: string;

	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	roleId: number;

	@BelongsTo(() => Role)
	role: Role;

	@BelongsToMany(() => Meetup, () => UserMeetups)
	meetups: Meetup[];
}
