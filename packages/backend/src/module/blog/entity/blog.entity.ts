import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn,
	BeforeInsert,
	BeforeUpdate,
	PrimaryGeneratedColumn,
	PrimaryColumn,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {NEWS_STATE, NEWS_STATUS} from '../type/blog.type';

import {NEWS_GROUP_KEY, ADMIN_KEY} from '~contants/relation';
import {NewsGroup} from '~module/news-groups/entity/news-group.entity';
import {Admin} from '~module/admin/entity/admin.entity';
import {Exclude} from 'class-transformer';
import createSlug from '~util/createSlug';
import {generateCode, generateId} from '~util/generate';

@Entity({name: 'blog'})
export class Blog extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
		default: () => generateId('AC'),
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
		nullable: false,
	})
	@ApiProperty()
	content: string;

	@Column({
		length: 500,
		nullable: false,
	})
	@ApiProperty()
	photo: string;

	@Column({
		type: 'enum',
		enum: NEWS_STATUS,
		default: NEWS_STATUS.PROCESS,
	})
	@ApiProperty()
	status: NEWS_STATUS;

	@Column({
		nullable: false,
		default: false,
	})
	@ApiProperty()
	published: boolean;

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

	@ManyToOne(() => Admin, {cascade: true})
	@JoinColumn({name: 'creator_id', referencedColumnName: 'id'})
	[ADMIN_KEY]: Admin;

	@ManyToOne(() => NewsGroup, {cascade: true})
	@JoinColumn({name: 'group_id', referencedColumnName: 'id'})
	[NEWS_GROUP_KEY]: NewsGroup;

	// @OneToMany(() => NewsImage, (newsImage) => newsImage.id)
	// [NEWS_IMAGE_LIST_KEY]: NewsImage[];

	@BeforeInsert()
	createSlug() {
		this.param = createSlug(this.name);
	}

	@BeforeUpdate()
	updateSlug() {
		this.param = createSlug(this.name);
	}

	@BeforeInsert()
	generateCode() {
		this.code = generateCode('NE');
	}
}
