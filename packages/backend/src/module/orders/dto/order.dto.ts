import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber} from 'class-validator';

export class CreateOrderDto {
	@IsNumber()
	@Expose()
	product_id: number;

	@IsNumber()
	@Expose()
	admin_id: number;

	@IsString()
	@Expose()
	email: string;

	@IsString()
	@Expose()
	name: string;

	@IsNumber()
	@Expose()
	price: number;

	@IsNumber()
	@Expose()
	status: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
