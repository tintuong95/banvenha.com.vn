import {Entity, Column, OneToOne, JoinColumn} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {Product} from '~module/products/entity/product.entity';
import {PRODUCT_KEY} from '~contants/relation';
import {Exclude} from 'class-transformer';

@Entity({name: 'product_files'})
export class ProductFiles extends BaseEntity {
	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	product_id: number;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	path: string;

	@Column({
		length: 20,
		nullable: false,
	})
	@ApiProperty()
	type: string;

	@OneToOne(() => Product, {cascade: true})
	@JoinColumn({name: 'product_id'})
	[PRODUCT_KEY]: Product;
}
