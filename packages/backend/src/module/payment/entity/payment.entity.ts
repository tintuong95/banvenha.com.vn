import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn,
	BeforeInsert,
	PrimaryColumn,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {PAYMENT_STATUS} from '../type/payement.type';
import {ADMIN_KEY} from '~contants/relation';
import {Exclude} from 'class-transformer';
import {generateId} from '~util/generate';

@Entity({name: 'payments'})
export class Payment extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
	})
	@ApiProperty()
	id: string;

	@Column({
		length: 100,
		nullable: false,
	})
	@ApiProperty()
	bankName: string;

	@Column({
		nullable: false,
		length: 100,
	})
	@ApiProperty()
	bankNumber: string;

	@Column({
		nullable: false,
		length: 100,
	})
	@ApiProperty()
	bankTransaction: string;

	@Column({nullable: false, length: 100})
	@ApiProperty()
	bankHolder: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	value: number;

	@Column({nullable: false, length: 25})
	@ApiProperty()
	accountId: string;

	@Column({
		type: 'enum',
		enum: PAYMENT_STATUS,
		default: PAYMENT_STATUS.SUCCESS,
	})
	@ApiProperty()
	status: PAYMENT_STATUS;

	// @ManyToOne(() => Admin, {cascade: true})
	// @JoinColumn({name: 'admin_id'})
	// [ADMIN_KEY]: Admin;

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}
}
