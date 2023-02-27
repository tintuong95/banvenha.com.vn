// import {define} from 'typeorm-seeding';
// import {faker} from '@faker-js/faker';
// import {News} from '~module/news/entity/news.entity';

// define(News, () => {
// 	const news = new News();
// 	news.content = faker.lorem.paragraphs(5);
// 	news.group_id = faker.datatype.number({min: 0, max: 5});
// 	news.image = faker.image.city();
// 	news.likes = faker.datatype.number({min: 0, max: 500});
// 	news.name = faker.lorem.words(6);
// 	news.param = faker.lorem.slug(6);
// 	news.views = faker.datatype.number({min: 0, max: 500});
// 	news.state = faker.datatype.number({min: 0, max: 1});
// 	news.status = faker.datatype.number({min: 0, max: 2});
// 	news.created_at = faker.date.between(
// 		'2020-01-01T00:00:00.000Z',
// 		'2021-01-01T00:00:00.000Z'
// 	);
// 	news.updated_at = faker.date.between(
// 		'2020-01-01T00:00:00.000Z',
// 		'2021-01-01T00:00:00.000Z'
// 	);
// 	return news;
// });
