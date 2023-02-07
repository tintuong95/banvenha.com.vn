import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {PAYMENT_STATUS} from '../type/payement';
import {Partner} from '~module/partner/entity/partner.entity';
import {PARTNER_KEY} from '~contants/relation';

@Entity({name: 'payments'})
export class Payment extends BaseEntity {
	@Column({
		length: 20,
		nullable: false,
	})
	@ApiProperty()
	code: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	bank_name: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	bank_number: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	bank_transaction: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	money: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	partner_id: number;

	@Column({
		type: 'enum',
		enum: PAYMENT_STATUS,
		default: PAYMENT_STATUS.SUCCESS,
	})
	@ApiProperty()
	status: PAYMENT_STATUS;

	@ManyToOne(() => Partner, {cascade: true})
	@JoinColumn({name: 'partner_id'})
	[PARTNER_KEY]: Partner;
}
