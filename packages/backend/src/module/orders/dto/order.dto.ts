import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber} from 'class-validator';

export class CreateOrderDto {
	@IsString()
	@Expose()
	code: string;

	@IsNumber()
	@Expose()
	product_id: number;

	@IsNumber()
	@Expose()
	partner_id: number;

	@IsString()
	@Expose()
	email: string;

	@IsNumber()
	@Expose()
	price: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
