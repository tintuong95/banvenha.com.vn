import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber, MaxLength} from 'class-validator';

export class CreateNewsImageDto {
	@IsNumber()
	@Expose()
	news_id: number;

	@IsString()
	@Expose()
	@MaxLength(50)
	name: string;

	@IsString()
	@Expose()
	@MaxLength(50)
	param: string;

	@IsString()
	@Expose()
	@MaxLength(50)
	path: string;
}

export class UpdateNewsImageDto extends PartialType(CreateNewsImageDto) {}
