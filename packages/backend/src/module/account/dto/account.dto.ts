import {PartialType} from '@nestjs/mapped-types';
import {IsNumber, IsString} from 'class-validator';

export class CreateAccountDto {
	@IsString()
	email: string;

	@IsString()
	password: string;

	@IsNumber()
	admin_id: number;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}

export class SignInAccountDto {
	@IsString()
	email: string;

	@IsString()
	password: string;
}
