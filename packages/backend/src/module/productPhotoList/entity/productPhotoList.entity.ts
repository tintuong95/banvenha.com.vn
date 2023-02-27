import {
	Entity,
	Column,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
	PrimaryColumn,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {GROUP_PRODUCT_KEY, PRODUCT_KEY} from '~contants/relation';

import createSlug from '~util/createSlug';
import {generateId} from '~util/generate';

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

	// @OneToMany(() => Product, (product) => product[GROUP_PRODUCT_KEY])
	// [PRODUCT_KEY]: Product[];

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}
}
