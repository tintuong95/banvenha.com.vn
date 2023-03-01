import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateBlogGroupDto, UpdateBlogGroupDto} from './dto/blogGroup.dto';
import {BlogGroup} from './entity/blogGroup.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {BLOG_RELATION} from '~contants/relation';

@Injectable()
export class BlogGroupService {
	constructor(
		@InjectRepository(BlogGroup)
		private blogGroupRepository: Repository<BlogGroup>
	) {}

	async getAllBlogGroups(): Promise<any> {
		try {
			return await this.blogGroupRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getBlogGroupDetails(id: string): Promise<BlogGroup | any> {
		try {
			const result = await this.blogGroupRepository.findOne({
				where: {id},
				relations: [BLOG_RELATION],
			});
			if (!result)
				throw new NotFoundException('BlogGroup Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createBlogGroup(
		createBlogGroupDto: CreateBlogGroupDto
	): Promise<BlogGroup> {
		const result = this.blogGroupRepository.create(createBlogGroupDto);
		return await this.blogGroupRepository.save(result);
	}

	async updateBlogGroup(
		id: string,
		updateBlogGroupDto: UpdateBlogGroupDto
	): Promise<BlogGroup> {
		try {
			const result = await this.blogGroupRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('BlogGroup Id ' + id + ' Not Found !');

			_(updateBlogGroupDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.blogGroupRepository.save(result);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeBlogGroup(id: string): Promise<string> {
		const result = await this.blogGroupRepository.softDelete(id);
		if (result.affected > 0)
			return 'Deleted BlogGroup Id ' + id + ' successfully !';
		throw new NotFoundException('BlogGroup Id ' + id + ' Not Found !');
	}

	async restoreBlogGroup(id: string): Promise<string> {
		const result = await this.blogGroupRepository.restore(id);
		if (result.affected > 0)
			return 'Restore BlogGroup Id ' + id + ' successfully !';
		throw new NotFoundException('BlogGroup Id ' + id + ' Not Found !');
	}

	async deleteBlogGroup(id: string): Promise<string> {
		const result = await this.blogGroupRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted BlogGroup Id ' + id + ' successfully !';
		throw new NotFoundException('BlogGroup Id ' + id + ' Not Found !');
	}
}
