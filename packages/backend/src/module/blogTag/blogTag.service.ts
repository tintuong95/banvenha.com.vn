import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateBlogTagDto, UpdateBlogTagDto} from './dto/blogTag.dto';
import {BlogTag} from './entity/blogTag.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {BLOG_RELATION} from '~contants/relation';

@Injectable()
export class BlogTagService {
	constructor(
		@InjectRepository(BlogTag)
		private blogTagRepository: Repository<BlogTag>
	) {}

	async getAllBlogTags(): Promise<any> {
		try {
			return await this.blogTagRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getBlogTagDetails(id: string): Promise<BlogTag | any> {
		try {
			const result = await this.blogTagRepository.findOne({
				where: {id},
				relations: [BLOG_RELATION],
			});
			if (!result)
				throw new NotFoundException('BlogTag Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createBlogTag(createBlogTagDto: CreateBlogTagDto): Promise<BlogTag> {
		const result = this.blogTagRepository.create(createBlogTagDto);
		return await this.blogTagRepository.save(result);
	}

	async updateBlogTag(
		id: string,
		updateBlogTagDto: UpdateBlogTagDto
	): Promise<BlogTag> {
		try {
			const result = await this.blogTagRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('BlogTag Id ' + id + ' Not Found !');

			_(updateBlogTagDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.blogTagRepository.save(result);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeBlogTag(id: string): Promise<string> {
		const result = await this.blogTagRepository.softDelete(id);
		if (result.affected > 0)
			return 'Deleted BlogTag Id ' + id + ' successfully !';
		throw new NotFoundException('BlogTag Id ' + id + ' Not Found !');
	}

	async restoreBlogTag(id: string): Promise<string> {
		const result = await this.blogTagRepository.restore(id);
		if (result.affected > 0)
			return 'Restore BlogTag Id ' + id + ' successfully !';
		throw new NotFoundException('BlogTag Id ' + id + ' Not Found !');
	}

	async deleteBlogTag(id: string): Promise<string> {
		const result = await this.blogTagRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted BlogTag Id ' + id + ' successfully !';
		throw new NotFoundException('BlogTag Id ' + id + ' Not Found !');
	}
}
