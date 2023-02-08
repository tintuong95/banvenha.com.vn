import {Entity, Column, OneToOne, BeforeInsert, JoinColumn} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {ADMIN_KEY} from '~contants/relation';
import {Admin} from '~module/admin/entity/admin.entity';
import * as bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer';

@Entity({name: 'accountsss'})
export class Account extends BaseEntity {
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
	@Exclude()
	password: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	admin_id: number;

	@OneToOne(() => Admin, {cascade: true})
	@JoinColumn({name: 'admin_id', referencedColumnName: 'id'})
	[ADMIN_KEY]: Admin;

	@BeforeInsert()
	hashPassword() {
		this.password = bcrypt.hashSync(
			this.password,
			Number(process.env.SALTROUNDS) || 10
		);
	}

	comparePassword(attempt: string): boolean {
		return bcrypt.compareSync(attempt, this.password);
	}
}
