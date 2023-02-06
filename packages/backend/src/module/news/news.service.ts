import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {NewsRepository} from './repository/news.repository';
import {CreateNewsDto, UpdateNewsDto} from './dto/News.dto';
import {News} from './entity/news.entity';

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(NewsRepository)
		private newsRepository: NewsRepository
	) {}

	async getAllNewss(): Promise<any> {
		try {
			return await this.newsRepository.getAllNewss();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getNewsDetails(id: number): Promise<News | any> {
		try {
			const result = await this.newsRepository.findOne({id});
			if (!result)
				throw new NotFoundException('News Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createNews(createNewsDto: CreateNewsDto): Promise<News > {
		try {
			return await this.newsRepository.save(createNewsDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateNews(
		id: number,
		updateNewsDto: UpdateNewsDto
	): Promise<News> {
		try {
			const result = await this.newsRepository.updateNews(id, updateNewsDto);
			if (!result)
				throw new NotFoundException('News Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeNews(id: number): Promise<any> {
		try {
			const result = await this.newsRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted News Id ' + id + ' successfully !';
			throw new NotFoundException('News Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
