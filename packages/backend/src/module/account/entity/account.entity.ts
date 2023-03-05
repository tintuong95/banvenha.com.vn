import {
	Entity,
	Column,
	OneToOne,
	OneToMany,
	PrimaryColumn,
	BeforeInsert,
	AfterLoad,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {ACCOUNT_STATUS, ROLE_STATUS} from '../type/account.type';
import {
	ACCOUNT_RELATION,
	ORDER_RELATION,
	PAYMENT_RELATION,
	PRODUCT_RELATION,
	MESSAGE_RECEIVER_RELATION,
	RECEIVER_RELATION,
	SENDER_RELATION,
	MESSAGE_SENDER_RELATION,
	BLOG_RELATION,
} from '~contants/relation';

import {Payment} from '~module/payment/entity/payment.entity';
import {Order} from '~module/orders/entity/order.entity';
import {Message} from '~module/message/entity/message.entity';
import {generateId} from '~util/generate';
import {Blog} from '~module/blog/entity/blog.entity';
import {Product} from '~module/product/entity/product.entity';
import {setLevel} from '~util/level';

@Entity({name: 'accounts'})
export class Account extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
	})
	@ApiProperty()
	id: string;

	@Column({length: 200, nullable: false})
	@ApiProperty()
	fullName: string;

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

	@Column({nullable: true})
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

	level: number;

	processing: number;

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}

	@AfterLoad()
	setLevel() {
		this.level = setLevel(this.point)?.level;
	}

	@AfterLoad()
	setProcessing() {
		this.processing = setLevel(this.point)?.processing;
	}

	@OneToOne(() => Account, (account) => account[ACCOUNT_RELATION])
	[ACCOUNT_RELATION]: Account;

	@OneToMany(() => Blog, (blog) => blog[ACCOUNT_RELATION])
	[BLOG_RELATION]: Blog[];

	@OneToMany(() => Message, (message) => message[RECEIVER_RELATION])
	[MESSAGE_RECEIVER_RELATION]: Message[];

	@OneToMany(() => Message, (message) => message[SENDER_RELATION])
	[MESSAGE_SENDER_RELATION]: Message[];

	@OneToMany(() => Product, (product) => product[ACCOUNT_RELATION])
	[PRODUCT_RELATION]: Product[];

	@OneToMany(() => Order, (order) => order[ACCOUNT_RELATION])
	[ORDER_RELATION]: Order[];

	@OneToMany(() => Payment, (payment) => payment[ACCOUNT_RELATION])
	[PAYMENT_RELATION]: Payment[];
}
