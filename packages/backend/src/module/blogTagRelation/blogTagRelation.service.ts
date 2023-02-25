import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateBlogTagRelationDto,
	UpdateBlogTagRelationDto,
} from './dto/blogTag.dto';
import {BlogTagRelation} from './entity/bogTagRelation.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {NEWS_KEY} from '~contants/relation';

@Injectable()
export class BlogTagRelationService {
	constructor(
		@InjectRepository(BlogTagRelation)
		private blogTagRelationRepository: Repository<BlogTagRelation>
	) {}

	async getAllBlogTagRelations(): Promise<any> {
		try {
			return await this.blogTagRelationRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getBlogTagRelationDetails(id: string): Promise<BlogTagRelation | any> {
		try {
			const result = await this.blogTagRelationRepository.findOne({
				where: {id},
				relations: [NEWS_KEY],
			});
			if (!result)
				throw new NotFoundException(
					'BlogTagRelation Id ' + id + ' Not Found !'
				);
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createBlogTagRelation(
		createBlogTagRelationDto: CreateBlogTagRelationDto
	): Promise<BlogTagRelation> {
		const result = this.blogTagRelationRepository.create(
			createBlogTagRelationDto
		);
		return await this.blogTagRelationRepository.save(result);
	}

	async updateBlogTagRelation(
		id: string,
		updateBlogTagRelationDto: UpdateBlogTagRelationDto
	): Promise<BlogTagRelation> {
		try {
			const result = await this.blogTagRelationRepository.findOne({
				where: {id},
			});
			if (!result)
				throw new NotFoundException(
					'BlogTagRelation Id ' + id + ' Not Found !'
				);

			_(updateBlogTagRelationDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.blogTagRelationRepository.save(result);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeBlogTagRelation(id: string): Promise<string> {
		const result = await this.blogTagRelationRepository.softDelete(id);
		if (result.affected > 0)
			return 'Deleted BlogTagRelation Id ' + id + ' successfully !';
		throw new NotFoundException('BlogTagRelation Id ' + id + ' Not Found !');
	}

	async restoreBlogTagRelation(id: string): Promise<string> {
		const result = await this.blogTagRelationRepository.restore(id);
		if (result.affected > 0)
			return 'Restore BlogTagRelation Id ' + id + ' successfully !';
		throw new NotFoundException('BlogTagRelation Id ' + id + ' Not Found !');
	}

	async deleteBlogTagRelation(id: string): Promise<string> {
		const result = await this.blogTagRelationRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted BlogTagRelation Id ' + id + ' successfully !';
		throw new NotFoundException('BlogTagRelation Id ' + id + ' Not Found !');
	}
}
