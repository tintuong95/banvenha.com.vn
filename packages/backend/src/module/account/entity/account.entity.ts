import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {ROLE} from '../type/account.type';

@Entity({name: 'accounts'})
export class Account extends BaseEntity {
	@Column({
		nullable: false,
	})
	@ApiProperty()
	reference_id: number;

	@Column({
		length: 25,
		nullable: false,
		unique: true,
	})
	@ApiProperty()
	email: string;

	@Column({
		length: 100,
		nullable: false,
	})
	@ApiProperty()
	password: string;

	@Column({
		type: 'enum',
		enum: ROLE,
		nullable: false,
	})
	@ApiProperty()
	role: ROLE;
}
