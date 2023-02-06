import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber, IsEnum} from 'class-validator';
import {PAYMENT_STATUS} from '../type/payement';

export class CreatePaymentDto {
	@IsString()
	@Expose()
	code: string;

	@IsString()
	@Expose()
	bank_name: string;

	@IsString()
	@Expose()
	bank_number: string;

	@IsString()
	@Expose()
	bank_transaction: string;

	@IsNumber()
	@Expose()
	money: number;

	@IsNumber()
	@Expose()
	partner_id: number;

	@IsEnum(PAYMENT_STATUS)
	@Expose()
	status: PAYMENT_STATUS;
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
