import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker';
import {Product} from '~module/products/entity/product.entity';

define(Product, () => {
	const product = new Product();
	product.code = faker.datatype.string(6);
	product.content = faker.lorem.paragraphs(5);
	product.description = faker.lorem.paragraphs(1);
	product.group_id = faker.datatype.number({min: 0, max: 5});
	product.image = faker.image.city();
	product.likes = faker.datatype.number({min: 0, max: 500});
	product.name = faker.lorem.words(6);
	product.param = faker.lorem.slug(6);
	product.price = faker.datatype.number({min: 5000, max: 50000});
	product.state = faker.datatype.number({min: 0, max: 1});
	product.status = faker.datatype.number({min: 0, max: 2});
	product.views = faker.datatype.number({min: 10, max: 1000});
	product.created_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	product.updated_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	return product;
});
