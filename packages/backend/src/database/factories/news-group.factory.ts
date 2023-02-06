import {define} from 'typeorm-seeding';
import {faker} from '@faker-js/faker';
import {NewsGroup} from '~module/news-groups/entity/news-group.entity';

define(NewsGroup, () => {
	const groupNews = new NewsGroup();
	groupNews.name = faker.lorem.words(3);
	groupNews.description = 'group news description ';
	groupNews.param = faker.lorem.slug();
	groupNews.created_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	groupNews.updated_at = faker.date.between(
		'2020-01-01T00:00:00.000Z',
		'2021-01-01T00:00:00.000Z'
	);
	return groupNews;
});
