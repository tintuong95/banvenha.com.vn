import {ROLE_STATUS} from '~module/account/type/account.type';

export class UserDto {
	id: string;
	name: string;
	role: ROLE_STATUS;
	iat: number;
	exp: number;
}
