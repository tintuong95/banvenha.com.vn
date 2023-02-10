import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber, IsOptional} from 'class-validator';

export class CreateProductImagesDto {
	@IsOptional()
	@IsNumber()
	@Expose()
	product_id: number;

	@IsString()
	@Expose()
	name: string;

	@IsString()
	@Expose()
	param: string;

	@IsString()
	@Expose()
	path: string;
}

export class UpdateProductImagesDto extends PartialType(
	CreateProductImagesDto
) {}
