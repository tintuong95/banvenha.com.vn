import {
	Entity,
	Column,
	OneToOne,
	JoinColumn,
	ManyToOne,
	BeforeInsert,
	PrimaryColumn,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {ADMIN_KEY, PRODUCT_KEY} from '~contants/relation';

import {Exclude} from 'class-transformer';
import {generateId} from '~util/generate';
import {ORDER_STATUS} from '../type/order.type';

@Entity({name: 'orders'})
export class Order extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
		default: () => generateId('PY'),
	})
	@ApiProperty()
	id: string;

	@Column({
		length: 100,
		nullable: false,
	})
	@ApiProperty()
	uid: string;

	@Column({
		length: 25,
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	productId: string;

	@Column({
		length: 25,
		nullable: false,
	})
	@ApiProperty()
	accountId: string;

	@Column({
		length: 100,
		nullable: false,
	})
	@ApiProperty()
	email: string;

	@Column({
		length: 100,
		nullable: false,
	})
	@ApiProperty()
	fullName: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	total: number;

	@Column({
		type: 'enum',
		enum: ORDER_STATUS,
		default: ORDER_STATUS.UNPAID,
	})
	@ApiProperty()
	status: ORDER_STATUS;

	// @OneToOne(() => Product, {cascade: true})
	// @JoinColumn({name: 'product_id'})
	// [PRODUCT_KEY]: Product;

	// @ManyToOne(() => Admin, {cascade: true})
	// @JoinColumn({name: 'admin_id'})
	// [ADMIN_KEY]: Admin;
}
