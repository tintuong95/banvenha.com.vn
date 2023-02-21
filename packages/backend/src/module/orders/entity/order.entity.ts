import {
	Entity,
	Column,
	OneToOne,
	JoinColumn,
	ManyToOne,
	BeforeInsert,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {Product} from '~module/products/entity/product.entity';
import {ADMIN_KEY, PRODUCT_KEY} from '~contants/relation';
import {Admin} from '~module/admin/entity/admin.entity';
import {Exclude} from 'class-transformer';
import {generateCode} from '~util/generate';
import {ORDER_STATUS} from '../type/order.type';

@Entity({name: 'orders'})
export class Order extends BaseEntity {
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
	@Exclude()
	product_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	admin_id: number;

	@Column({
		length: 20,
		nullable: false,
	})
	@ApiProperty()
	email: string;

	@Column({
		length: 25,
		nullable: false,
	})
	@ApiProperty()
	name: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	price: number;

	@Column({
		type: 'enum',
		enum: ORDER_STATUS,
		default: ORDER_STATUS.UNPAID,
	})
	@ApiProperty()
	status: ORDER_STATUS;

	@OneToOne(() => Product, {cascade: true})
	@JoinColumn({name: 'product_id'})
	[PRODUCT_KEY]: Product;

	@ManyToOne(() => Admin, {cascade: true})
	@JoinColumn({name: 'admin_id'})
	[ADMIN_KEY]: Admin;

	@BeforeInsert()
	generateCode() {
		this.code = generateCode('OD');
	}
}
