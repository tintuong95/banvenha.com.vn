import {IntersectionType, PartialType} from '@nestjs/mapped-types';
import {Expose, Type} from 'class-transformer';
import {
	IsString,
	IsNumber,
	IsEnum,
	IsOptional,
	ValidateNested,
} from 'class-validator';
import {CreateProductDetailsDto} from '~module/product-details/dto/product-details.dto';
import {CreateProductFilesDto} from '~module/product-files/dto/product-files.dto';
import {CreateProductImagesDto} from '~module/product-images/dto/product-images.dto';
import {PRODUCT_STATE, PRODUCT_STATUS} from '../type/product.type';

export class CreateProductDto {
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
	@IsNumber()
	@Expose()
	creator_id: number;

	@IsNumber()
	@Expose()
	group_id: number;

	@IsOptional()
	@IsEnum(PRODUCT_STATUS)
	@Expose()
	status: PRODUCT_STATUS;

	@IsOptional()
	@IsEnum(PRODUCT_STATE)
	@Expose()
	state: PRODUCT_STATE;

	@IsOptional()
	@IsString()
	@Expose()
	image: string;

	@IsNumber()
	@Expose()
	sale: number;

	@IsNumber()
	@Expose()
	price: number;
}

export class CreateProductAllFieldDto extends IntersectionType(
	CreateProductDto,
	CreateProductDetailsDto
) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

// export class CreateProductAllDto {
// 	@Type(() => CreateProductDto)
// 	@ValidateNested()
// 	info: CreateProductDto;

// 	@Type(() => CreateProductFilesDto)
// 	@ValidateNested()
// 	file: CreateProductFilesDto;

// 	@Type(() => CreateProductImagesDto)
// 	@ValidateNested()
// 	images: CreateProductImagesDto;

// 	@Type(() => CreateProductDetailsDto)
// 	@ValidateNested()
// 	details: CreateProductDetailsDto;
// }
