/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateNewsImageDto} from '../dto/news-images.dto';

import {NewsImage} from '../entity/news-images.entity';

@EntityRepository(NewsImage)
export class NewsImageRepository extends Repository<NewsImage> {
	async updateNewsImage(
		id: number,
		updateNewsImageDto: UpdateNewsImageDto
	): Promise<NewsImage | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateNewsImageDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllNewsImages(): Promise<NewsImage[]> {
		return await this.find();
	}
}
