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
import {NEWS_STATE, NEWS_STATUS} from '../type/blog.type';

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
	@IsEnum(NEWS_STATUS)
	@Expose()
	status: NEWS_STATUS;

	@IsBoolean()
	@Expose()
	published: boolean;

	@IsString()
	@Expose()
	creatorId: string;

	@IsString()
	@Expose()
	groupId: string;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

export class BlogQueryDto extends PartialType(Blog) {}
