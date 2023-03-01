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
import {BLOG_RELATION, BLOG_TAG_RELATION} from '~contants/relation';
import createSlug from '~util/createSlug';
import {generateId} from '~util/generate';
import {Blog} from '~module/blog/entity/blog.entity';
import {BlogTag} from '~module/blogTag/entity/blogTag.entity';

@Entity({name: 'blog_tag_relations'})
export class BlogTagRelation extends BaseEntity {
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
	blogId: string;

	@Column({
		length: 25,
		nullable: false,
	})
	@ApiProperty()
	blogTagId: string;

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}

	@ManyToOne(() => Blog, {cascade: true})
	@JoinColumn({name: 'blogId', referencedColumnName: 'id'})
	[BLOG_RELATION]: Blog;

	@ManyToOne(() => BlogTag, {cascade: true})
	@JoinColumn({name: 'blogTagId', referencedColumnName: 'id'})
	[BLOG_TAG_RELATION]: BlogTag;
}
