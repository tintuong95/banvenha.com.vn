// import {define} from 'typeorm-seeding';
// import {faker} from '@faker-js/faker';
// import {ProductDetails} from '~module/product-details/entity/product-details.entity';

// define(ProductDetails, () => {
// 	const productDetails = new ProductDetails();
// 	productDetails.area = faker.datatype.number({min: 100, max: 200});
// 	productDetails.bedroom = faker.datatype.number({min: 1, max: 4});
// 	productDetails.floor = faker.datatype.number({min: 1, max: 4});
// 	productDetails.long = faker.datatype.number({min: 20, max: 40});
// 	productDetails.product_id = faker.datatype.number({min: 1, max: 100});
// 	productDetails.width = faker.datatype.number({min: 4, max: 10});
// 	productDetails.created_at = faker.date.between(
// 		'2020-01-01T00:00:00.000Z',
// 		'2021-01-01T00:00:00.000Z'
// 	);
// 	productDetails.updated_at = faker.date.between(
// 		'2020-01-01T00:00:00.000Z',
// 		'2021-01-01T00:00:00.000Z'
// 	);
// 	return productDetails;
// });
