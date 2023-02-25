import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber, IsEnum, IsOptional} from 'class-validator';
import {IsFile} from '~shared/file.dto';
import {News} from '../entity/blog.entity';
import {NEWS_STATE, NEWS_STATUS} from '../type/blog.type';

export class CreateNewsDto {
	@IsString()
	@Expose()
	name: string;

	@IsString()
	@Expose()
	description: string;

	@IsString()
	@Expose()
	content: string;

	@IsOptional()
	@IsString()
	@Expose()
	image: string;

	@IsOptional()
	@IsEnum(NEWS_STATUS)
	@Expose()
	status: NEWS_STATUS;

	@IsOptional()
	@IsEnum(NEWS_STATE)
	@Expose()
	state: NEWS_STATE;

	@IsNumber()
	@Expose()
	group_id: number;

	@IsOptional()
	@IsNumber()
	@Expose()
	creator_id: number;

	@IsFile({mime: ['image/jpg', 'image/png']})
	file: any;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}

export class NewsQueryDto extends PartialType(News) {}
