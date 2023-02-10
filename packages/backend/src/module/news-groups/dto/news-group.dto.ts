import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, MaxLength} from 'class-validator';

export class CreateNewsGroupDto {
	@IsString()
	@Expose()
	@MaxLength(50)
	name: string;

	@IsString()
	@Expose()
	@MaxLength(100)
	description: string;
}

export class UpdateNewsGroupDto extends PartialType(CreateNewsGroupDto) {}
