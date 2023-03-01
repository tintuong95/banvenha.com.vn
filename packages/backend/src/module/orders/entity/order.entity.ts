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
import {ACCOUNT_RELATION, PRODUCT_RELATION} from '~contants/relation';

import {Exclude} from 'class-transformer';
import {generateId} from '~util/generate';
import {ORDER_STATUS} from '../type/order.type';
import {Account} from '~module/account/entity/account.entity';
import {Product} from '~module/product/entity/product.entity';

@Entity({name: 'orders'})
export class Order extends BaseEntity {
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

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}

	@ManyToOne(() => Account, {cascade: true})
	@JoinColumn({name: 'accountId'})
	[ACCOUNT_RELATION]: Account;

	@OneToOne(() => Product, {cascade: true})
	@JoinColumn({name: 'productId'})
	[PRODUCT_RELATION]: Product;
}
