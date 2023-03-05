import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn,
	BeforeInsert,
	BeforeUpdate,
	PrimaryGeneratedColumn,
	PrimaryColumn,
	OneToMany,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {BLOG_PUBLISHED, BLOG_STATUS} from '../type/blog.type';

import {
	ACCOUNT_RELATION,
	BLOG_GROUP_RELATION,
	BLOG_RELATION,
	BLOG_TAG_RE_RELATION,
} from '~contants/relation';
// import {NewsGroup} from '~module/news-groups/entity/news-group.entity';
// import {Admin} from '~module/admin/entity/admin.entity';
import {Exclude} from 'class-transformer';
import createSlug from '~util/createSlug';
import {generateId} from '~util/generate';
import {BlogGroup} from '~module/blogGroup/entity/blogGroup.entity';
import {BlogTagRelation} from '~module/blogTagRelation/entity/bogTagRelation.entity';
import {Account} from '~module/account/entity/account.entity';

@Entity({name: 'blogs'})
export class Blog extends BaseEntity {
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
	})
	@ApiProperty()
	slug: string;

	@Column({
		length: 500,
		nullable: false,
	})
	@ApiProperty()
	description: string;

	@Column({
		type: 'text',
		nullable: false,
	})
	content: string;

	@Column({
		length: 500,
		nullable: false,
	})
	@ApiProperty()
	photo: string;

	@Column({
		type: 'enum',
		enum: BLOG_STATUS,
		default: BLOG_STATUS.PROCESS,
	})
	@ApiProperty()
	status: BLOG_STATUS;

	@Column({
		type: 'enum',
		enum: BLOG_PUBLISHED,
		default: BLOG_PUBLISHED.DRAFT,
	})
	@ApiProperty()
	published: BLOG_PUBLISHED;

	@Column({
		nullable: false,
		default: 0,
	})
	@ApiProperty()
	likes: number;

	@Column({
		nullable: false,
		default: 0,
	})
	@ApiProperty()
	views: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	creatorId: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	groupId: string;

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}

	@BeforeInsert()
	createSlug() {
		this.slug = createSlug(this.title);
	}

	@BeforeUpdate()
	updateSlug() {
		this.slug = createSlug(this.title);
	}

	@ManyToOne(() => BlogGroup, {cascade: true})
	@JoinColumn({name: 'groupId', referencedColumnName: 'id'})
	[BLOG_GROUP_RELATION]: BlogGroup;

	@OneToMany(
		() => BlogTagRelation,
		(blogTagRelation) => blogTagRelation[BLOG_RELATION]
	)
	[BLOG_TAG_RE_RELATION]: BlogTagRelation[];

	@ManyToOne(() => Account, {cascade: true})
	@JoinColumn({name: 'creatorId', referencedColumnName: 'id'})
	[ACCOUNT_RELATION]: Account;
}
