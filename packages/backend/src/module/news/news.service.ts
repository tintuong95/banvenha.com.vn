import {Injectable, UnauthorizedException} from '@nestjs/common';
import {NotFoundException, ForbiddenException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateNewsDto, UpdateNewsDto} from './dto/News.dto';
import {News} from './entity/news.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ADMIN_KEY, NEWS_GROUP_KEY, PARTNER_KEY} from '~contants/relation';
import {handleQuery, pagination} from '~util/pagination';
import {Request} from 'express';
import {findOptionWhere} from '~util/query';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';
import {ROLE} from '~contants/role';
import * as fs from 'fs-extra';

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(News)
		private newsRepository: Repository<News>
	) {}

	async getAllNews(request: Request, query: any, user: UserDto): Promise<any> {
		const {skip, take, currentPage, perPage} = handleQuery(query);

		const newQuery = findOptionWhere(query, ['name']);

		const isPartner = user.role === ROLE.PARTNER;

		if (isPartner) newQuery['creator_id'] = user.id;

		const result = await this.newsRepository.findAndCount({
			where: newQuery,
			relations: [ADMIN_KEY, NEWS_GROUP_KEY],
			take,
			skip,
			withDeleted: user.role === ROLE.ADMIN,
		});
		return pagination(request, result, currentPage, perPage);
	}

	async getNewsDetails(id: number): Promise<News | any> {
		const result = await this.newsRepository.findOne({
			where: {id},
			relations: [ADMIN_KEY, NEWS_GROUP_KEY],
		});
		if (!result) throw new NotFoundException('News Id ' + id + ' Not Found !');
		return result;
	}

	async getNewsSlugDetails(slug: string): Promise<News | any> {
		const result = await this.newsRepository.findOne({
			where: {param: slug},
			relations: [ADMIN_KEY, NEWS_GROUP_KEY],
		});
		if (!result)
			throw new NotFoundException('News Slug ' + slug + ' Not Found !');
		return result;
	}

	async createNews(
		createNewsDto: CreateNewsDto,
		image: Express.Multer.File,
		creator_id: number
	): Promise<News> {
		createNewsDto.image = image.filename;
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
		if (file) {
			// fs.removeSync('../../../uploads/images' + result.image);
			result.image = file.filename;
		}
		return this.newsRepository.save(result);
	}

	async removeNews(id: number, creator_id: number): Promise<any> {
		const findNews = await this.newsRepository.findOne({where: {id}});
		if (!findNews && findNews?.creator_id !== creator_id) {
			throw new UnauthorizedException('Unauthorized !');
		}
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

	async changeStatusNewsByAdmin(
		id: number,
		statusDto: UpdateNewsDto
	): Promise<any> {
		const {status = 0} = statusDto;
		const result = await this.newsRepository.findOne({where: {id}});
		if (!result) throw new NotFoundException('News Id ' + id + ' Not Found !');
		result.status = status;
		return this.newsRepository.save(result);
	}
	async countNews(user: UserDto): Promise<any> {
		const options = {};
		if (user.role === ROLE.PARTNER) {
			options['creator_id'] = user.id;
		}
		const result = await this.newsRepository.count({
			where: options,
		});
		if (!result)
			throw new NotFoundException('Count ' + user.id + ' Not Found !');

		return {count: result};
	}
}
