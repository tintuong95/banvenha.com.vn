import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsEnum, IsOptional, MaxLength} from 'class-validator';
import {PARTNER_STATUS} from '../type/partner.type';

export class CreatePartnerDto {
	@IsString()
	@Expose()
	@MaxLength(20)
	name: string;

	@IsString()
	@Expose()
	@MaxLength(20)
	nickname: string;

	@IsString()
	@Expose()
	@MaxLength(100)
	address: string;

	@IsString()
	@Expose()
	@MaxLength(20)
	tel: string;

	@IsString()
	@Expose()
	@MaxLength(50)
	avatar: string;

	@IsString()
	@Expose()
	@MaxLength(25)
	email: string;

	@IsOptional()
	@IsString()
	@Expose()
	@MaxLength(50)
	bank_code: string;

	@IsOptional()
	@IsString()
	@Expose()
	@MaxLength(50)
	bank_name: string;

	@IsOptional()
	@IsString()
	@Expose()
	@MaxLength(50)
	bank_account_type: string;

	@IsOptional()
	@IsString()
	@Expose()
	@MaxLength(50)
	bank_account_number: string;

	@IsOptional()
	@IsString()
	@Expose()
	@MaxLength(50)
	bank_holder: string;

	// @IsString()
	// @Expose()
	// province: string;

	// @IsString()
	// @Expose()
	// district: string;

	// @IsString()
	// @Expose()
	// ward: string;

	@IsEnum(PARTNER_STATUS)
	@Expose()
	status: PARTNER_STATUS;
}

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
