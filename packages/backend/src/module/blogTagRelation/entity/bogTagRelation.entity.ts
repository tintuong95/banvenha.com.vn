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
import {NEWS_GROUP_KEY, NEWS_KEY} from '~contants/relation';
import createSlug from '~util/createSlug';
import {generateId} from '~util/generate';

@Entity({name: 'BlogTagRelations'})
export class BlogTagRelation extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
		default: () => generateId('BTR'),
	})
	@ApiProperty()
	id: string;

	@Column({
		length: 25,
		nullable: false,
	})
	@ApiProperty()
	blogId: string;

	@Column({
		length: 25,
		nullable: false,
	})
	@ApiProperty()
	blogTagId: string;

	// @OneToMany(() => News, (news) => news[NEWS_GROUP_KEY])
	// [NEWS_KEY]: News[];
}
