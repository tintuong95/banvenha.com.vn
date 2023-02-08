import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {
	IsString,
	IsEnum,
	IsOptional,
	MaxLength,
	IsNumber,
} from 'class-validator';
import {ADMIN_STATUS, ROLE_TYPE} from '../type/admin.type';

export class CreateAdminDto {
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

	@IsNumber()
	@Expose()
	account_id: number;

	@IsOptional()
	@IsEnum(ADMIN_STATUS)
	@Expose()
	status: ADMIN_STATUS;

	@IsOptional()
	@IsEnum(ROLE_TYPE)
	@Expose()
	role: ROLE_TYPE;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
