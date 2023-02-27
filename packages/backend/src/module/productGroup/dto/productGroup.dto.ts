import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, MaxLength} from 'class-validator';

export class CreateProductGroupDto {
	@IsString()
	@Expose()
	@MaxLength(200)
	title: string;
}

export class UpdateProductGroupDto extends PartialType(CreateProductGroupDto) {}
