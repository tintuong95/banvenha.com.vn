import {Entity, Column, OneToOne, OneToMany} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {ADMIN_STATUS, ROLE_TYPE} from '../type/admin.type';
import {Account} from '~module/account/entity/account.entity';
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

import {News} from '~module/news/entity/news.entity';
import {Product} from '~module/products/entity/product.entity';
import {Payment} from '~module/payment/entity/payment.entity';
import {Order} from '~module/orders/entity/order.entity';
import {Message} from '~module/message/entity/message.entity';

@Entity({name: 'Admins'})
export class Admin extends BaseEntity {
	@Column({length: 20, nullable: false})
	@ApiProperty()
	name: string;

	@Column({length: 20, nullable: false})
	@ApiProperty()
	nickname: string;

	@Column({length: 100, nullable: false})
	@ApiProperty()
	address: string;

	@Column({length: 20, nullable: false})
	@ApiProperty()
	tel: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	avatar: string;

	@Column({length: 25, nullable: false})
	@ApiProperty()
	email: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_code: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_name: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_account_type: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_account_number: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_holder: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	birthday: string;

	// @Column({length: 20, nullable: true})
	// @ApiProperty()
	// province: string;

	// @Column({length: 20, nullable: true})
	// @ApiProperty()
	// district: string;

	// @Column({length: 20, nullable: true})
	// @ApiProperty()
	// ward: string;

	@Column({
		type: 'enum',
		enum: ADMIN_STATUS,
		default: ADMIN_STATUS.PROCESS,
	})
	@ApiProperty()
	status: ADMIN_STATUS;

	@Column({
		type: 'enum',
		enum: ROLE_TYPE,
		default: ROLE_TYPE.PARTNER,
	})
	@ApiProperty()
	role: ROLE_TYPE;

	@OneToOne(() => Account, (account) => account[ADMIN_KEY])
	[ACCOUNT_KEY]: Account;

	@OneToMany(() => News, (news) => news.id)
	[NEWS_KEY]: News[];

	@OneToMany(() => Product, (product) => product[ADMIN_KEY])
	[PRODUCT_KEY]: Product[];

	@OneToMany(() => Payment, (payment) => payment[ADMIN_KEY])
	[PAYMENT_KEY]: Payment[];

	@OneToMany(() => Order, (order) => order[ADMIN_KEY])
	[ORDER_KEY]: Order[];

	@OneToMany(() => Message, (message) => message[RECEIVER_KEY])
	[MESSAGE_RECEIVER_KEY]: Message[];

	@OneToMany(() => Message, (message) => message[SENDER_KEY])
	[MESSAGE_SENDER_KEY]: Message[];
}
