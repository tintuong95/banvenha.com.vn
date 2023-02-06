import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker';
import {ProductGroup} from '~module/product-groups/entity/product-group.entity';

define(ProductGroup, () => {
	const groupProduct = new ProductGroup();
	groupProduct.name = faker.lorem.words(3);
	groupProduct.description = 'group product description ';
	groupProduct.param = faker.lorem.slug();
	groupProduct.created_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	groupProduct.updated_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	return groupProduct;
});
