import {Entity, Column, OneToMany, BeforeInsert, BeforeUpdate} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {News} from '~module/news/entity/news.entity';
import {NEWS_GROUP_KEY, NEWS_KEY} from '~contants/relation';
import createSlug from '~util/createSlug';

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
		unique: true,
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

	@BeforeInsert()
	createSlug() {
		this.param = createSlug(this.name, true);
	}

	@BeforeUpdate()
	updateSlug() {
		this.param = createSlug(this.name, true);
	}
}
