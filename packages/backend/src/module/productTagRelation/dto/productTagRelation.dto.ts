import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString} from 'class-validator';

export class CreateProductTagRelationDto {
	@IsString()
	@Expose()
	productId: string;

	@IsString()
	@Expose()
	productTagId: string;
}

export class UpdateProductTagRelationDto extends PartialType(
	CreateProductTagRelationDto
) {}
