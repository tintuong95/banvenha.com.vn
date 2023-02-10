import {ROLE_TYPE} from '~module/admin/type/admin.type';

export class UserDto {
	id: number;
	name: string;
	role: ROLE_TYPE;
	iat: number;
	exp: number;
}
