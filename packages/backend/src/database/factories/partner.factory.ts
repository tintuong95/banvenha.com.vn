import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker';
import {Partner} from '~module/partner/entity/partner.entity';

define(Partner, () => {
	const partner = new Partner();
	partner.avatar = faker.image.avatar();
	partner.address = faker.address.streetAddress();
	partner.bank_code = '01204009';
	partner.bank_account_number = '01204009';
	partner.bank_account_type = 'bankType';
	partner.bank_holder = 'bankHolder';
	partner.bank_name = 'Vietcombank';
	partner.email = faker.internet.email();
	partner.name = faker.name.fullName();
	partner.nickname = faker.name.lastName();
	// partner.province = faker.address.city();
	partner.status = faker.datatype.number({min: 0, max: 2});
	partner.tel = faker.phone.number();
	// partner.ward = faker.address.city();
	// partner.district = faker.address.city();
	partner.created_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	partner.updated_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	return partner;
});
