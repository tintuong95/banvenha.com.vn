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
// import {News} from '~module/news/entity/news.entity';
import {NEWS_GROUP_KEY, NEWS_KEY} from '~contants/relation';
import createSlug from '~util/createSlug';
import {generateId} from '~util/generate';

@Entity({name: 'BlogGroups'})
export class BlogGroup extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
		default: () => generateId('BG'),
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

	// @OneToMany(() => News, (news) => news[NEWS_GROUP_KEY])
	// [NEWS_KEY]: News[];

	@BeforeInsert()
	createSlug() {
		this.slug = createSlug(this.title, true);
	}

	@BeforeUpdate()
	updateSlug() {
		this.slug = createSlug(this.title, true);
	}
}
