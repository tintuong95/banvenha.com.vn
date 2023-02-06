import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker';
import {NewsImage} from '~module/news-images/entity/news-images.entity';

define(NewsImage, () => {
	const newsImage = new NewsImage();
	newsImage.name = faker.lorem.words(6);
	newsImage.param = faker.lorem.slug(6);
	newsImage.news_id = faker.datatype.number({min: 0, max: 5});
	newsImage.path = faker.system.filePath();
	newsImage.created_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	newsImage.updated_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	return newsImage;
});
