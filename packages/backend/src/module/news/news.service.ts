import {Injectable} from '@nestjs/common';
import {NotFoundException, ForbiddenException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateNewsDto, UpdateNewsDto} from './dto/News.dto';
import {News} from './entity/news.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ADMIN_KEY, NEWS_GROUP_KEY, PARTNER_KEY} from '~contants/relation';
import {handleQuery, pagination} from '~util/pagination';
import {Request} from 'express';

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(News)
		private newsRepository: Repository<News>
	) {}

	async getAllNews(request: Request, query: any): Promise<any> {
		const {skip, take, currentPage, perPage} = handleQuery(query);
		const result = await this.newsRepository.findAndCount({
			where: {},
			relations: [ADMIN_KEY, NEWS_GROUP_KEY],
			take,
			skip,
		});
		return pagination(request, result, currentPage, perPage);
	}

	async getNewsDetails(id: number): Promise<News | any> {
		const result = await this.newsRepository.findOne({
			where: {id},
			relations: [PARTNER_KEY, NEWS_GROUP_KEY],
		});
		if (!result) throw new NotFoundException('News Id ' + id + ' Not Found !');
		return result;
	}

	async createNews(
		createNewsDto: CreateNewsDto,
		file: Express.Multer.File,
		creator_id: number
	): Promise<News> {
		createNewsDto.image = file.filename;
		createNewsDto.creator_id = creator_id;

		const result = this.newsRepository.create(createNewsDto);
		return await this.newsRepository.save(result);
	}

	async updateNews(
		id: number,
		updateNewsDto: UpdateNewsDto,
		file: Express.Multer.File,
		creator_id: number
	): Promise<News> {
		const result = await this.newsRepository.findOne({where: {id}});

		if (!result) throw new NotFoundException('News Id ' + id + ' Not Found !');
		if (result.creator_id !== creator_id)
			throw new ForbiddenException('Forbidden !');

		_(updateNewsDto).forEach((val, key) => {
			if (val) result[key] = val;
		});

		if (file) result.image = file.filename;

		return this.newsRepository.save(result);
	}

	async removeNews(id: number): Promise<any> {
		const result = await this.newsRepository.softDelete(id);
		if (result.affected > 0) return 'Removed News Id ' + id + ' successfully !';
		throw new NotFoundException('News Id ' + id + ' Not Found !');
	}
	async deleteNews(id: number): Promise<any> {
		const result = await this.newsRepository.delete(id);
		if (result.affected > 0) return 'Deleted News Id ' + id + ' successfully !';
		throw new NotFoundException('News Id ' + id + ' Not Found !');
	}
	async restoreNews(id: number): Promise<any> {
		const result = await this.newsRepository.restore(id);
		if (result.affected > 0)
			return 'Restored News Id ' + id + ' successfully !';
		throw new NotFoundException('News Id ' + id + ' Not Found !');
	}
}
