import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {
	IsString,
	IsNumber,
	IsEnum,
	IsOptional,
	IsBoolean,
} from 'class-validator';
import {IsFile} from '~shared/file.dto';
import {Blog} from '../entity/blog.entity';
import {BLOG_PUBLISHED, BLOG_STATUS} from '../type/blog.type';

export class CreateBlogDto {
	@IsString()
	@Expose()
	title: string;

	@IsString()
	@Expose()
	description: string;

	@IsString()
	@Expose()
	content: string;

	@IsOptional()
	@IsString()
	@Expose()
	photo: string;

	@IsOptional()
	@IsEnum(BLOG_STATUS)
	@Expose()
	status: BLOG_STATUS;

	@IsOptional()
	@IsEnum(BLOG_PUBLISHED)
	@Expose()
	published: BLOG_PUBLISHED;

	@IsString()
	@Expose()
	creatorId: string;

	@IsString()
	@Expose()
	groupId: string;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

export class BlogQueryDto extends PartialType(Blog) {}
