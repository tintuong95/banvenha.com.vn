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
import {ADMIN_KEY} from '~contants/relation';

import * as bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer';
import {generateId} from '~util/generate';

@Entity({name: 'Verified'})
export class Verified extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
		default: () => generateId('VR'),
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

	// @OneToOne(() => Admin, {cascade: true})
	// @JoinColumn({name: 'admin_id', referencedColumnName: 'id'})
	// [ADMIN_KEY]: Admin;

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
}
