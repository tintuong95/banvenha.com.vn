import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {NEWS_STATE, NEWS_STATUS} from '../type/news.type';

import {NEWS_GROUP_KEY, ADMIN_KEY} from '~contants/relation';
import {NewsGroup} from '~module/news-groups/entity/news-group.entity';
import {Admin} from '~module/admin/entity/admin.entity';
import {Exclude} from 'class-transformer';
import createSlug from '~util/createSlug';
import {generateCode} from '~util/generate';

@Entity({name: 'news'})
export class News extends BaseEntity {
	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	name: string;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	code: string;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	param: string;

	@Column({
		length: 100,
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
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	image: string;

	@Column({
		type: 'enum',
		enum: NEWS_STATUS,
		default: NEWS_STATUS.PROCESS,
	})
	@ApiProperty()
	status: NEWS_STATUS;

	@Column({
		type: 'enum',
		enum: NEWS_STATE,
		default: NEWS_STATE.PUBLISHED,
	})
	@ApiProperty()
	state: NEWS_STATE;

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
	creator_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	group_id: number;

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
