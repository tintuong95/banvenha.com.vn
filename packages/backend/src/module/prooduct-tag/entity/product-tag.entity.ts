import {Entity, Column, ManyToOne, JoinColumn, BeforeInsert} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';

import {Exclude} from 'class-transformer';

@Entity({name: 'product_tags'})
export class ProductTags extends BaseEntity {
	@Column({
		nullable: false,
	})
	@ApiProperty()
	title: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	product_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	metaTitle: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	slug: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	content: string;
}
