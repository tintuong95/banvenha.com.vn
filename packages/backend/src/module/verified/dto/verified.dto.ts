import {PartialType} from '@nestjs/mapped-types';
import {IsNumber, IsString} from 'class-validator';

export class CreateVerifiedDto {
	@IsString()
	accountId: string;

	@IsString()
	username: string;

	@IsString()
	password: string;
}

export class UpdateVerifiedDto extends PartialType(CreateVerifiedDto) {}

export class SignInVerifiedDto {
	@IsString()
	username: string;

	@IsString()
	password: string;
}
