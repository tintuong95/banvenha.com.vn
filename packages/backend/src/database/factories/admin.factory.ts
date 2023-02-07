import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker';
import {Admin} from '~module/admin/entity/admin.entity';

define(Admin, () => {
	const admin = new Admin();
	admin.name = faker.name.fullName();
	admin.nickname = faker.name.lastName();
	admin.address = faker.address.streetAddress();
	admin.tel = faker.phone.number();
	admin.avatar = faker.image.avatar();
	admin.status = faker.datatype.number({min: 0, max: 1});
	admin.account_id = faker.datatype.number({min: 0, max: 100});
	admin.created_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	admin.updated_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	return admin;
});
