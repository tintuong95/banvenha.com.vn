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
// import {Product} from '~module/products/entity/product.entity';
import createSlug, {handleSlug} from '~util/createSlug';
import {generateId} from '~util/generate';

@Entity({name: 'product_group'})
export class ProductGroup extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
		default: () => generateId('PG'),
	})
	@ApiProperty()
	id: string;

	@Column({
		length: 200,
		nullable: false,
	})
	@ApiProperty()
	title: string;

	@Column({
		length: 200,
		nullable: false,
		unique: true,
	})
	@ApiProperty()
	slug: string;

	@BeforeInsert()
	createSlug() {
		this.slug = createSlug(this.title, true);
	}

	@BeforeUpdate()
	updateSlug() {
		this.slug = createSlug(this.title, true);
	}

	// @OneToMany(() => Product, (product) => product[GROUP_PRODUCT_KEY])
	// [PRODUCT_KEY]: Product[];
}
