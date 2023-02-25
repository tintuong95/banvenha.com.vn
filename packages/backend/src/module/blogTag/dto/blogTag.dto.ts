import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, MaxLength} from 'class-validator';

export class CreateBlogTagDto {
	@IsString()
	@Expose()
	@MaxLength(200)
	title: string;
}

export class UpdateBlogTagDto extends PartialType(CreateBlogTagDto) {}
