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

@Entity({name: 'productTagRelations'})
export class ProductTagRelation extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
		default: () => generateId('PTR'),
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
}
