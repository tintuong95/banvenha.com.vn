import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker';
import {ProductImages} from '~module/product-images/entity/product-images.entity';

define(ProductImages, () => {
	const productImage = new ProductImages();
	productImage.name = faker.lorem.words(6);
	productImage.param = faker.lorem.slug(6);
	productImage.product_id = faker.datatype.number({min: 0, max: 5});
	productImage.path = faker.system.filePath();
	productImage.created_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	productImage.updated_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	return productImage;
});
