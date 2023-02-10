import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsNumber, IsOptional} from 'class-validator';

export class CreateProductDetailsDto {
	@IsOptional()
	@IsNumber()
	@Expose()
	product_id: number;

	@IsNumber()
	@Expose()
	floor: number;

	@IsNumber()
	@Expose()
	bedroom: number;

	@IsNumber()
	@Expose()
	width: number;

	@IsNumber()
	@Expose()
	long: number;

	@IsNumber()
	@Expose()
	area: number;
}

export class UpdateProductDetailsDto extends PartialType(
	CreateProductDetailsDto
) {}
