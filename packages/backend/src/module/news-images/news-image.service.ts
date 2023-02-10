import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateNewsImageDto, UpdateNewsImageDto} from './dto/news-images.dto';
import {NewsImage} from './entity/news-images.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
@Injectable()
export class NewsImageService {
	constructor(
		@InjectRepository(NewsImage)
		private newsImageRepository: Repository<NewsImage>
	) {}

	async getAllNewsImages(): Promise<any> {
		return await this.newsImageRepository.find();
	}

	async getNewsImageDetails(id: number): Promise<NewsImage | any> {
		const result = await this.newsImageRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('NewsImage Id ' + id + ' Not Found !');
		return result;
	}

	async createNewsImage(
		createNewsImageDto: CreateNewsImageDto
	): Promise<NewsImage> {
		return await this.newsImageRepository.save(createNewsImageDto);
	}

	async updateNewsImage(
		id: number,
		updateNewsImageDto: UpdateNewsImageDto
	): Promise<NewsImage> {
		const result = await this.newsImageRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('NewsImage Id ' + id + ' Not Found !');

		_(updateNewsImageDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.newsImageRepository.save(result);
	}

	async removeNewsImage(id: number): Promise<any> {
		const result = await this.newsImageRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed NewsImage Id ' + id + ' successfully !';
		throw new NotFoundException('NewsImage Id ' + id + ' Not Found !');
	}

	async deleteNewsImage(id: number): Promise<any> {
		const result = await this.newsImageRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted NewsImage Id ' + id + ' successfully !';
		throw new NotFoundException('NewsImage Id ' + id + ' Not Found !');
	}

	async restoreNewsImage(id: number): Promise<any> {
		const result = await this.newsImageRepository.restore(id);
		if (result.affected > 0)
			return 'Restored NewsImage Id ' + id + ' successfully !';
		throw new NotFoundException('NewsImage Id ' + id + ' Not Found !');
	}
}
