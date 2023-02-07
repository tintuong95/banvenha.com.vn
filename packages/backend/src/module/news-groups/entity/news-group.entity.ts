import {Entity, Column, OneToMany} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {News} from '~module/news/entity/news.entity';
import {NEWS_GROUP_KEY, NEWS_KEY} from '~contants/relation';

@Entity({name: 'news_group'})
export class NewsGroup extends BaseEntity {
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

	@OneToMany(() => News, (news) => news[NEWS_GROUP_KEY])
	[NEWS_KEY]: News[];
}
