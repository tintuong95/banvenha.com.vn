import {PartialType} from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import {IsString, IsNumber,IsEnum} from 'class-validator';
import {  NEWS_STATE, NEWS_STATUS } from '../type/news.type';

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

	@IsString()
	@Expose()
	image: string;

	@IsEnum(NEWS_STATUS)
	@Expose()
	status: NEWS_STATUS;

	@IsEnum(NEWS_STATE)
	@Expose()
	state: NEWS_STATE;

	@IsNumber()
	@Expose()
	group_id: number;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
