import {
	Entity,
	Column,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
	PrimaryColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {PRODUCT_RELATION} from '~contants/relation';

import createSlug from '~util/createSlug';
import {generateId} from '~util/generate';
import {Product} from '~module/product/entity/product.entity';

@Entity({name: 'product_photo_lists'})
export class ProductPhotoList extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
	})
	@ApiProperty()
	id: string;

	@Column({
		length: 500,
		nullable: false,
	})
	@ApiProperty()
	path: string;

	@Column({
		length: 25,
		nullable: false,
	})
	@ApiProperty()
	productId: string;

	// @OneToMany(() => Product, (product) => product[GROUP_PRODUCT_RELATION])
	// [PRODUCT_RELATION]: Product[];

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}

	@ManyToOne(() => Product, {cascade: true})
	@JoinColumn({name: 'productId'})
	[PRODUCT_RELATION]: Product;
}
