import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsNumber} from 'class-validator';

export class CreateAccountDto {
	@IsString()
	@Expose()
	email: string;

	@IsString()
	@Expose()
	password: string;

	@IsNumber()
	@Expose()
	role: number;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
