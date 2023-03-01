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
import {BLOG_GROUP_RELATION, BLOG_RELATION} from '~contants/relation';
import createSlug from '~util/createSlug';
import {generateId} from '~util/generate';
import {Blog} from '~module/blog/entity/blog.entity';

@Entity({name: 'blog_groups'})
export class BlogGroup extends BaseEntity {
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

	@OneToMany(() => Blog, (blog) => blog[BLOG_GROUP_RELATION])
	[BLOG_RELATION]: Blog[];
}
