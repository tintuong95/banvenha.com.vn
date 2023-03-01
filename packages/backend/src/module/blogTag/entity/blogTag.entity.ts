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
import {BLOG_TAG_RELATION, BLOG_TAG_RE_RELATION} from '~contants/relation';
import createSlug from '~util/createSlug';
import {generateId} from '~util/generate';
import {BlogTagRelation} from '~module/blogTagRelation/entity/bogTagRelation.entity';

@Entity({name: 'blog_tags'})
export class BlogTag extends BaseEntity {
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
	setId() {
		this.id = generateId('BL');
	}

	@BeforeInsert()
	createSlug() {
		this.slug = createSlug(this.title, true);
	}

	@BeforeUpdate()
	updateSlug() {
		this.slug = createSlug(this.title, true);
	}

	@OneToMany(
		() => BlogTagRelation,
		(blogTagRelation) => blogTagRelation[BLOG_TAG_RELATION]
	)
	[BLOG_TAG_RE_RELATION]: BlogTagRelation[];
}
