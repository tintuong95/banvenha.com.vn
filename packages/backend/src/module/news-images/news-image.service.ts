import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {NewsImageRepository} from './repository/news-images.repository';
import {CreateNewsImageDto, UpdateNewsImageDto} from './dto/news-images.dto';
import {NewsImage} from './entity/news-images.entity';

@Injectable()
export class NewsImageService {
	constructor(
		@InjectRepository(NewsImageRepository)
		private newsImageRepository: NewsImageRepository
	) {}

	async getAllNewsImages(): Promise<any> {
		try {
			return await this.newsImageRepository.getAllNewsImages();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getNewsImageDetails(id: number): Promise<NewsImage | any> {
		try {
			const result = await this.newsImageRepository.findOne({id});
			if (!result)
				throw new NotFoundException('NewsImage Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createNewsImage(
		createNewsImageDto: CreateNewsImageDto
	): Promise<NewsImage> {
		try {
			return await this.newsImageRepository.save(createNewsImageDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateNewsImage(
		id: number,
		updateNewsImageDto: UpdateNewsImageDto
	): Promise<NewsImage> {
		try {
			const result = await this.newsImageRepository.updateNewsImage(
				id,
				updateNewsImageDto
			);
			if (!result)
				throw new NotFoundException('NewsImage Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeNewsImage(id: number): Promise<any> {
		try {
			const result = await this.newsImageRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted NewsImage Id ' + id + ' successfully !';
			throw new NotFoundException('NewsImage Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
