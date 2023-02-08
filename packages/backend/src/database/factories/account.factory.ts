import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker';
import {Account} from '~module/account/entity/account.entity';

define(Account, () => {
	const account = new Account();

	account.email = faker.internet.email();
	account.password = faker.internet.password();
	account.created_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	account.updated_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	return account;
});
