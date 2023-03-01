import {
	Entity,
	Column,
	OneToOne,
	BeforeInsert,
	JoinColumn,
	PrimaryColumn,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {ACCOUNT_RELATION} from '~contants/relation';

import * as bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer';
import {generateId} from '~util/generate';
import {Account} from '~module/account/entity/account.entity';

@Entity({name: 'Verified'})
export class Verified extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
	})
	@ApiProperty()
	id: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	accountId: string;

	@Column({
		length: 50,
		nullable: false,
		unique: true,
	})
	@ApiProperty()
	username: string;

	@Column({
		length: 100,
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	password: string;

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}

	@BeforeInsert()
	hashPassword() {
		this.password = bcrypt.hashSync(
			this.password,
			+process.env.SALTROUNDS || 10
		);
	}

	comparePassword(attempt: string): boolean {
		return bcrypt.compareSync(attempt, this.password);
	}

	@OneToOne(() => Account, {cascade: true})
	@JoinColumn({name: 'accountId', referencedColumnName: 'id'})
	[ACCOUNT_RELATION]: Account;
}
