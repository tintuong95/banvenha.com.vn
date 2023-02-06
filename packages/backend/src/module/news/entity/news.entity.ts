import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {NEWS_STATE, NEWS_STATUS} from '../type/news.type';

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
		default: NEWS_STATUS.NORMAL,
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
	creator_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	group_id: number;
}
