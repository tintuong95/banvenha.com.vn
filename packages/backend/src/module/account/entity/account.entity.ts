import {Entity, Column, OneToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {ACCOUNT_STATUS, ROLE_STATUS} from '../type/account.type';
import {
	ACCOUNT_KEY,
	NEWS_KEY,
	ORDER_KEY,
	ADMIN_KEY,
	PAYMENT_KEY,
	PRODUCT_KEY,
	MESSAGE_RECEIVER_KEY,
	RECEIVER_KEY,
	SENDER_KEY,
	MESSAGE_SENDER_KEY,
} from '~contants/relation';

import {Product} from '~module/products/entity/product.entity';
import {Payment} from '~module/payment/entity/payment.entity';
import {Order} from '~module/orders/entity/order.entity';
import {Message} from '~module/message/entity/message.entity';
import {generateId} from '~util/generate';

@Entity({name: 'Accounts'})
export class Account extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
		default: () => generateId('AC'),
	})
	@ApiProperty()
	id: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	nickname: string;

	@Column({length: 200, nullable: false})
	@ApiProperty()
	address: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	tel: string;

	@Column({length: 500, nullable: false})
	@ApiProperty()
	avatar: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	email: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bankName: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bankNumber: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bankHolder: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	birthday: Date;

	@Column({nullable: true, default: 0})
	@ApiProperty()
	point: number;

	@Column({
		type: 'enum',
		enum: ACCOUNT_STATUS,
		default: ACCOUNT_STATUS.PROCESS,
	})
	@ApiProperty()
	status: ACCOUNT_STATUS;

	@Column({
		type: 'enum',
		enum: ROLE_STATUS,
		default: ROLE_STATUS.PARTNER,
	})
	@ApiProperty()
	role: ROLE_STATUS;

	// @OneToOne(() => Account, (account) => account[ADMIN_KEY])
	// [ACCOUNT_KEY]: Account;

	// @OneToMany(() => News, (news) => news.id)
	// [NEWS_KEY]: News[];

	// @OneToMany(() => Product, (product) => product[ADMIN_KEY])
	// [PRODUCT_KEY]: Product[];

	// @OneToMany(() => Payment, (payment) => payment[ADMIN_KEY])
	// [PAYMENT_KEY]: Payment[];

	// @OneToMany(() => Order, (order) => order[ADMIN_KEY])
	// [ORDER_KEY]: Order[];

	// @OneToMany(() => Message, (message) => message[RECEIVER_KEY])
	// [MESSAGE_RECEIVER_KEY]: Message[];

	// @OneToMany(() => Message, (message) => message[SENDER_KEY])
	// [MESSAGE_SENDER_KEY]: Message[];
}
