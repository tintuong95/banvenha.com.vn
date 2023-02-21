import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {Exclude} from 'class-transformer';
import {Product} from '~module/products/entity/product.entity';
import {PRODUCT_IMAGES_KEY, PRODUCT_KEY} from '~contants/relation';

@Entity({name: 'product_images'})
export class ProductImages extends BaseEntity {
	@Column({
		nullable: false,
	})
	@Exclude()
	@ApiProperty()
	product_id: number;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	name: string;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	param: string;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	path: string;

	@ManyToOne(() => Product, {cascade: true})
	@JoinColumn({name: 'product_id', referencedColumnName: 'id'})
	[PRODUCT_KEY]: Product;
}
