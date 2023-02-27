import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateProductTagsDto {
	@IsString()
	@Expose()
	@MaxLength(200)
	title: string;
}

export class UpdateProductTagsDto extends PartialType(CreateProductTagsDto) {}
