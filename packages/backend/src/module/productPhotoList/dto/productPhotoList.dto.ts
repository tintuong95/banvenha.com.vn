import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString} from 'class-validator';

export class CreateproductPhotoListDto {
	@IsString()
	@Expose()
	path: string;

	@IsString()
	@Expose()
	productId: string;
}

export class UpdateproductPhotoListDto extends PartialType(
	CreateproductPhotoListDto
) {}
