import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {ADMIN_STATUS} from '../type/admin.type';

@Entity({name: 'admins'})
export class Admin extends BaseEntity {
	@Column({
		length: 30,
		nullable: false,
	})
	@ApiProperty()
	name: string;

	@Column({
		length: 30,
		nullable: false,
	})
	@ApiProperty()
	nickname: string;

	@Column({
		length: 100,
		nullable: false,
	})
	@ApiProperty()
	address: string;

	@Column({
		length: 20,
		nullable: false,
	})
	@ApiProperty()
	tel: string;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	avatar: string;

	@Column({
		type: 'enum',
		enum: ADMIN_STATUS,
		default: ADMIN_STATUS.NORMAL,
	})
	@ApiProperty()
	status: ADMIN_STATUS;
}
