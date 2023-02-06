import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateNewsGroupDto, UpdateNewsGroupDto} from './dto/news-group.dto';
import {NewsGroup} from './entity/news-group.entity';
import {NewsGroupRepository} from './repository/news-group.repository';

@Injectable()
export class NewsGroupService {
	constructor(
		@InjectRepository(NewsGroupRepository)
		private newsGroupRepository: NewsGroupRepository
	) {}

	async getAllNewsGroups(): Promise<any> {
		try {
			return await this.newsGroupRepository.getAllNewsGroups();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getNewsGroupDetails(id: number): Promise<NewsGroup | any> {
		try {
			const result = await this.newsGroupRepository.findOne({id});
			if (!result)
				throw new NotFoundException('NewsGroup Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createNewsGroup(
		createNewsGroupDto: CreateNewsGroupDto
	): Promise<NewsGroup> {
		try {
			return await this.newsGroupRepository.save(createNewsGroupDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateNewsGroup(
		id: number,
		updateNewsGroupDto: UpdateNewsGroupDto
	): Promise<NewsGroup> {
		try {
			const result = await this.newsGroupRepository.updateNewsGroup(
				id,
				updateNewsGroupDto
			);
			if (!result)
				throw new NotFoundException('NewsGroup Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeNewsGroup(id: number): Promise<any> {
		try {
			const result = await this.newsGroupRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted NewsGroup Id ' + id + ' successfully !';
			throw new NotFoundException('NewsGroup Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
