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
import {
	PRODUCT_RELATION,
	PRODUCT_TAG_RELATION,
	PRODUCT_TAG_RE_RELATION,
} from '~contants/relation';
import createSlug from '~util/createSlug';
import {generateId} from '~util/generate';
import {Product} from '~module/product/entity/product.entity';

@Entity({name: 'product_tag_relation'})
export class ProductTagRelation extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
	})
	@ApiProperty()
	id: string;

	@Column({
		length: 25,
		nullable: false,
	})
	@ApiProperty()
	productId: string;

	@Column({
		length: 25,
		nullable: false,
	})
	@ApiProperty()
	productTagId: string;

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}

	@ManyToOne(() => Product, {cascade: true})
	@JoinColumn({name: 'productId'})
	[PRODUCT_RELATION]: Product;

	@ManyToOne(() => ProductTagRelation, {cascade: true})
	@JoinColumn({name: 'productTagId'})
	[PRODUCT_TAG_RELATION]: ProductTagRelation;
}
