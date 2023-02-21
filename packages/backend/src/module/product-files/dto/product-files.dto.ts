import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber, IsOptional} from 'class-validator';

export class CreateProductFilesDto {
	@IsNumber()
	@Expose()
	product_id: number;

	@IsString()
	@Expose()
	path: string;

	@IsString()
	@Expose()
	type: string;
}

export class UpdateProductFilesDto extends PartialType(CreateProductFilesDto) {}
