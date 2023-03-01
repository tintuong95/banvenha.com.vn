import {PartialType} from '@nestjs/mapped-types';
import {IsOptional, IsString} from 'class-validator';

export class SignUpDto {
	@IsString()
	fullName: string;

	@IsString()
	address: string;

	@IsString()
	tel: string;

	@IsOptional()
	@IsString()
	avatar: string;

	@IsString()
	email: string;

	@IsString()
	username: string;

	@IsString()
	password: string;
}

export class UpdateAccountDto extends PartialType(SignUpDto) {}

export class SignInDto {
	@IsString()
	username: string;

	@IsString()
	password: string;
}
