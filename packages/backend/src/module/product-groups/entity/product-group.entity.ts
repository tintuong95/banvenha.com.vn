import {Entity, Column, OneToMany, BeforeInsert, BeforeUpdate} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {GROUP_PRODUCT_KEY, PRODUCT_KEY} from '~contants/relation';
import {Product} from '~module/products/entity/product.entity';
import createSlug from '~util/createSlug';

@Entity({name: 'product_group'})
export class ProductGroup extends BaseEntity {
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
		length: 100,
		nullable: false,
	})
	@ApiProperty()
	description: string;

	@BeforeInsert()
	create() {
		this.param = createSlug(this.name, true);
	}

	@BeforeUpdate()
	update() {
		this.param = createSlug(this.name, true);
	}

	@OneToMany(() => Product, (product) => product[GROUP_PRODUCT_KEY])
	[PRODUCT_KEY]: Product[];
}
