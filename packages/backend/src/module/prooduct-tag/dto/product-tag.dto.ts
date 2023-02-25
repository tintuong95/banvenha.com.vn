import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsNumber, IsString} from 'class-validator';

export class CreateProductTagsDto {
	@IsString()
	@Expose()
	title: string;

	@IsString()
	@Expose()
	metaTitle: string;

	@IsString()
	@Expose()
	content: string;

	@IsNumber()
	@Expose()
	product_id: number;
}

export class UpdateProductTagsDto extends PartialType(CreateProductTagsDto) {}
