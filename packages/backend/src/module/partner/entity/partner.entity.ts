import {Entity, Column, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {PARTNER_STATUS} from '../type/partner.type';
import {Account} from '~module/account/entity/account.entity';
import {
	ACCOUNT_KEY,
	MESSAGE_KEY,
	NEWS_KEY,
	ORDER_KEY,
	PARTNER_KEY,
	PAYMENT_KEY,
	PRODUCT_KEY,
} from '~contants/relation';
import {News} from '~module/news/entity/news.entity';
import {Product} from '~module/products/entity/product.entity';
import {Payment} from '~module/payment/entity/payment.entity';
import {Order} from '~module/orders/entity/order.entity';
import {Message} from '~module/message/entity/message.entity';

@Entity({name: 'partners'})
export class Partner extends BaseEntity {
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

	// @Column({length: 20, nullable: true})
	// @ApiProperty()
	// province: string;

	// @Column({length: 20, nullable: true})
	// @ApiProperty()
	// district: string;

	// @Column({length: 20, nullable: true})
	// @ApiProperty()
	// ward: string;

	@Column()
	@ApiProperty()
	account_id: number;

	@Column({
		type: 'enum',
		enum: PARTNER_STATUS,
		default: PARTNER_STATUS.NORMAL,
	})
	@ApiProperty()
	status: PARTNER_STATUS;

	@OneToOne(() => Account, {cascade: true})
	@JoinColumn({name: 'account_id', referencedColumnName: 'id'})
	[ACCOUNT_KEY]: Account;

	@OneToMany(() => News, (news) => news.id)
	[NEWS_KEY]: News[];

	@OneToMany(() => Product, (product) => product[PARTNER_KEY])
	[PRODUCT_KEY]: Product[];

	@OneToMany(() => Payment, (payment) => payment[PARTNER_KEY])
	[PAYMENT_KEY]: Payment[];

	@OneToMany(() => Order, (order) => order[PARTNER_KEY])
	[ORDER_KEY]: Order[];

	@OneToMany(() => Message, (message) => message[PARTNER_KEY])
	[MESSAGE_KEY]: Message[];
}
