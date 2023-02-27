// import {define} from 'typeorm-seeding';
// import {faker} from '@faker-js/faker';
// import {Admin} from '~module/admin/entity/admin.entity';

// define(Admin, () => {
// 	const admin = new Admin();
// 	admin.avatar = faker.image.avatar();
// 	admin.address = faker.address.streetAddress();
// 	admin.bank_code = '01204009';
// 	admin.bank_account_number = '01204009';
// 	admin.bank_account_type = 'bankType';
// 	admin.bank_holder = 'bankHolder';
// 	admin.bank_name = 'Vietcombank';
// 	admin.email = faker.internet.email();
// 	admin.name = faker.name.fullName();
// 	admin.nickname = faker.name.lastName();
// 	// admin.province = faker.address.city();
// 	admin.status = faker.datatype.number({min: 0, max: 2});
// 	admin.role = faker.datatype.number({min: 0, max: 1});
// 	admin.tel = faker.phone.number();
// 	// admin.ward = faker.address.city();
// 	// admin.district = faker.address.city();
// 	admin.created_at = faker.date.between(
// 		'2020-01-01T00:00:00.000Z',
// 		'2021-01-01T00:00:00.000Z'
// 	);
// 	admin.updated_at = faker.date.between(
// 		'2020-01-01T00:00:00.000Z',
// 		'2021-01-01T00:00:00.000Z'
// 	);
// 	return admin;
// });
