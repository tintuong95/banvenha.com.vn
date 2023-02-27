import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn,
	BeforeInsert,
	PrimaryColumn,
	BeforeUpdate,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';

import {Exclude} from 'class-transformer';
import {generateId} from '~util/generate';
import createSlug from '~util/createSlug';

@Entity({name: 'product_tags'})
export class ProductTags extends BaseEntity {
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
}
