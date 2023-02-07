import {Entity, Column, OneToOne, JoinColumn} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {Product} from '~module/products/entity/product.entity';
import {PRODUCT_KEY} from '~contants/relation';

@Entity({name: 'product_details'})
export class ProductDetails extends BaseEntity {
	@Column({
		nullable: false,
	})
	@ApiProperty()
	product_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	floor: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	bedroom: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	width: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	long: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	area: number;

	@OneToOne(() => Product, {cascade: true})
	@JoinColumn({name: 'product_id'})
	[PRODUCT_KEY]: Product;
}
