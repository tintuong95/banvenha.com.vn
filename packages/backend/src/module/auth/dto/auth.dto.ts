import {IsObject} from 'class-validator';

export class SignUpDto {
	@IsObject()
	account: object;

	@IsObject()
	admin: object;
}
