import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, MaxLength} from 'class-validator';

export class CreateBlogTagRelationDto {
	@IsString()
	@Expose()
	@MaxLength(25)
	blogId: string;

	@IsString()
	@Expose()
	@MaxLength(25)
	blogTagId: string;
}

export class UpdateBlogTagRelationDto extends PartialType(
	CreateBlogTagRelationDto
) {}
