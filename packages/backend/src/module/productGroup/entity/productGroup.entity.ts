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
import {PRODUCT_GROUP_RELATION, PRODUCT_RELATION} from '~contants/relation';
// import {Product} from '~module/products/entity/product.entity';
import createSlug, {handleSlug} from '~util/createSlug';
import {generateId} from '~util/generate';
import {Product} from '~module/product/entity/product.entity';

@Entity({name: 'product_groups'})
export class ProductGroup extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
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

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}

	@OneToMany(() => Product, (product) => product[PRODUCT_GROUP_RELATION])
	[PRODUCT_RELATION]: Product[];
}
