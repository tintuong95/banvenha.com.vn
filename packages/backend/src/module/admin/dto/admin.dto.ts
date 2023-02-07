import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsEnum, IsNumber, IsOptional} from 'class-validator';
import {ADMIN_STATUS} from '../type/admin.type';

export class CreateAdminDto {
	@IsString()
	@Expose()
	name: string;

	@IsString()
	@Expose()
	nickname: string;

	@IsString()
	@Expose()
	address: string;

	@IsString()
	@Expose()
	tel: string;

	@IsString()
	@Expose()
	avatar: string;

	@IsOptional()
	@IsEnum(ADMIN_STATUS)
	@Expose()
	status: ADMIN_STATUS;

	@IsNumber()
	@Expose()
	account_id: number;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
