import {IntersectionType, PartialType} from '@nestjs/mapped-types';
import {Expose, Type} from 'class-transformer';
import {
	IsString,
	IsNumber,
	IsEnum,
	IsOptional,
	ValidateNested,
	IsBoolean,
	IsArray,
} from 'class-validator';
import {PRODUCT_STATUS} from '../type/product.type';

export class CreateProductDto {
	@IsOptional()
	@IsNumber()
	@Expose()
	creatorId: string;

	@IsString()
	@Expose()
	title: string;

	@IsString()
	@Expose()
	description: string;

	@IsString()
	@Expose()
	content: string;

	@IsString()
	@Expose()
	groupId: string;

	@IsOptional()
	@IsEnum(PRODUCT_STATUS)
	@Expose()
	status: PRODUCT_STATUS;

	@IsOptional()
	@IsBoolean()
	@Expose()
	published: boolean;

	@IsOptional()
	@IsString()
	@Expose()
	photo: string;

	@IsNumber()
	@Expose()
	price: number;

	@IsNumber()
	@Expose()
	sale: number;

	@IsOptional()
	@IsString()
	@Expose()
	file: string;

	// @IsString()
	// @Expose()
	// photoList: string;
}

// export class CreateProductAllFieldDto extends IntersectionType(
// 	CreateProductDto,
// 	CreateProductDetailsDto
// ) {}

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
