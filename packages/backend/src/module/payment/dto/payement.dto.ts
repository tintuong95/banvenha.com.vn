import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber, IsEnum, IsOptional} from 'class-validator';
import {PAYMENT_STATUS} from '../type/payement.type';

export class CreatePaymentDto {
	@IsString()
	@Expose()
	code: string;

	@IsString()
	@Expose()
	bankName: string;

	@IsString()
	@Expose()
	bankNumber: string;

	@IsString()
	@Expose()
	bankTransaction: string;

	@IsString()
	@Expose()
	bankHolder: string;

	@IsNumber()
	@Expose()
	value: number;

	@IsOptional()
	@IsEnum(PAYMENT_STATUS)
	@Expose()
	status: PAYMENT_STATUS;
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
