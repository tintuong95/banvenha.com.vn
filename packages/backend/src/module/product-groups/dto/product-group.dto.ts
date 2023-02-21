import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString} from 'class-validator';

export class CreateProductGroupDto {
	@IsString()
	@Expose()
	name: string;

	@IsString()
	@Expose()
	description: string;
}

export class UpdateProductGroupDto extends PartialType(CreateProductGroupDto) {}
