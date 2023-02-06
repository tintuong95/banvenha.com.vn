import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber, IsEnum} from 'class-validator';
import {PRODUCT_STATE, PRODUCT_STATUS} from '../type/product.type';

export class CreateProductDto {
	@IsString()
	@Expose()
	code: string;

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

	@IsNumber()
	@Expose()
	creator_id: number;

	@IsNumber()
	@Expose()
	group_id: number;

	@IsEnum(PRODUCT_STATUS)
	@Expose()
	status: PRODUCT_STATUS;

	@IsEnum(PRODUCT_STATE)
	@Expose()
	state: PRODUCT_STATE;

	@IsString()
	@Expose()
	image: string;

	// @IsString()
	// @Expose()
	// download: string;

	@IsNumber()
	@Expose()
	price: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
