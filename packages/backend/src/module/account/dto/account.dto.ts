import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {
	IsString,
	IsEnum,
	IsOptional,
	MaxLength,
	IsNumber,
} from 'class-validator';
import {ACCOUNT_STATUS, ROLE_STATUS} from '../type/account.type';

export class CreateAccountDto {
	@IsString()
	@Expose()
	@MaxLength(200)
	fullName: string;

	@IsString()
	@Expose()
	@MaxLength(200)
	address: string;

	@IsString()
	@Expose()
	@MaxLength(50)
	tel: string;

	@IsString()
	@Expose()
	@MaxLength(500)
	avatar: string;

	@IsString()
	@Expose()
	@MaxLength(50)
	email: string;

	@IsOptional()
	@IsString()
	@Expose()
	@MaxLength(50)
	bankName: string;

	@IsOptional()
	@IsString()
	@Expose()
	@MaxLength(50)
	bankNumber: string;

	@IsOptional()
	@IsString()
	@Expose()
	@MaxLength(50)
	bankHolder: string;

	@IsString()
	@Expose()
	@MaxLength(50)
	birthday: Date;

	@IsNumber()
	@Expose()
	point: number;

	@IsOptional()
	@IsEnum(ACCOUNT_STATUS)
	@Expose()
	status: ACCOUNT_STATUS;

	@IsOptional()
	@IsEnum(ROLE_STATUS)
	@Expose()
	role: ROLE_STATUS;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
