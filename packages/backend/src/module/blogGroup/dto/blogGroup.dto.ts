import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, MaxLength} from 'class-validator';

export class CreateBlogGroupDto {
	@IsString()
	@Expose()
	@MaxLength(200)
	title: string;
}

export class UpdateBlogGroupDto extends PartialType(CreateBlogGroupDto) {}
