/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateNewsDto} from '../dto/News.dto';
import {News} from '../entity/news.entity';


/**Import end*/

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
	/**
	 *  @Param {number} id
	 *  @Param {updateNewsDto} UpdateNewsDto
	 *  @Return {News} News || null
	 */
	async updateNews(
		id: number,
		updateNewsDto: UpdateNewsDto
	): Promise<News | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateNewsDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllNewss(): Promise<News[]> {
		return await this.find();
	}
}
