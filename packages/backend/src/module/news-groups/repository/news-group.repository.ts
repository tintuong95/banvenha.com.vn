/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateNewsGroupDto} from '../dto/news-group.dto';
import {NewsGroup} from '../entity/news-group.entity';

/**Import end*/

@EntityRepository(NewsGroup)
export class NewsGroupRepository extends Repository<NewsGroup> {
	async updateNewsGroup(
		id: number,
		updateNewsGroupDto: UpdateNewsGroupDto
	): Promise<NewsGroup | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateNewsGroupDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllNewsGroups(): Promise<NewsGroup[]> {
		return await this.find();
	}
}
