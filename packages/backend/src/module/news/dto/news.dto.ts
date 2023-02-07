import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber, IsEnum, IsOptional} from 'class-validator';
import {NEWS_STATE, NEWS_STATUS} from '../type/news.type';

export class CreateNewsDto {
	@IsString()
	@Expose()
	name: string;

	@IsString()
	@Expose()
	param: string;

	@IsString()
	@Expose()
	description: string;

	@IsString()
	@Expose()
	content: string;

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

	@IsNumber()
	@Expose()
	creator_id: number;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
