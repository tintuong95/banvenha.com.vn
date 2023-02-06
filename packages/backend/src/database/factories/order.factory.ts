import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker';
import {Order} from '~module/orders/entity/order.entity';

define(Order, () => {
	const order = new Order();
	order.code = faker.datatype.string(6);
	order.email = faker.internet.email();
	order.partner_id = faker.datatype.number({min: 0, max: 100});
	order.product_id = faker.datatype.number({min: 0, max: 100});
	order.created_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	order.updated_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	return order;
});
