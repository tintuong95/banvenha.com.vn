import {Injectable, UnauthorizedException} from '@nestjs/common';
import {NotFoundException, ForbiddenException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateBlogDto, UpdateBlogDto} from './dto/blog.dto';
import {Blog} from './entity/blog.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ACCOUNT_RELATION, BLOG_GROUP_RELATION} from '~contants/relation';
import {handleQuery, pagination} from '~util/pagination';
import {Request} from 'express';
import {findOptionWhere} from '~util/query';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';
import {ROLE} from '~contants/role';
import * as fs from 'fs-extra';

@Injectable()
export class BlogService {
	constructor(
		@InjectRepository(Blog)
		private blogRepository: Repository<Blog>
	) {}

	async getAllBlog(request: Request, query: any, user: UserDto): Promise<any> {
		const {skip, take, currentPage, perPage} = handleQuery(query);

		const newQuery = findOptionWhere(query, ['name']);

		const isPartner = user.role === ROLE.PARTNER;

		if (isPartner) newQuery['creatorId'] = user.id;

		const result = await this.blogRepository.findAndCount({
			where: newQuery,
			relations: [ACCOUNT_RELATION, BLOG_GROUP_RELATION],
			take,
			skip,
			withDeleted: user.role === ROLE.ADMIN,
		});
		return pagination(request, result, currentPage, perPage);
	}

	async getBlogDetails(id: string): Promise<Blog | any> {
		const result = await this.blogRepository.findOne({
			where: {id},
			relations: [ACCOUNT_RELATION, BLOG_GROUP_RELATION],
		});
		if (!result) throw new NotFoundException('Blog Id ' + id + ' Not Found !');
		return result;
	}

	async getBlogSlugDetails(slug: string): Promise<Blog | any> {
		const result = await this.blogRepository.findOne({
			where: {slug: slug},
			relations: [ACCOUNT_RELATION, BLOG_GROUP_RELATION],
		});
		if (!result)
			throw new NotFoundException('Blog Slug ' + slug + ' Not Found !');
		return result;
	}

	async createBlog(
		createBlogDto: CreateBlogDto,
		image: Express.Multer.File,
		creatorId: string
	): Promise<Blog> {
		createBlogDto.photo = image.filename;
		createBlogDto.creatorId = creatorId;
		const result = this.blogRepository.create(createBlogDto);
		return await this.blogRepository.save(result);
	}
	async updateBlog(
		id: string,
		updateBlogDto: UpdateBlogDto,
		photo: Express.Multer.File,
		creatorId: string
	): Promise<Blog> {
		const result = await this.blogRepository.findOne({where: {id}});

		if (!result) throw new NotFoundException('Blog Id ' + id + ' Not Found !');
		if (result.creatorId !== creatorId)
			throw new ForbiddenException('Forbidden !');

		_(updateBlogDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		if (photo) {
			// fs.removeSync('../../../uploads/images' + result.image);
			result.photo = photo.filename;
		}
		return this.blogRepository.save(result);
	}

	async removeBlog(id: string, creatorId: string): Promise<any> {
		const findBlog = await this.blogRepository.findOne({where: {id}});
		if (!findBlog && findBlog?.creatorId !== creatorId) {
			throw new UnauthorizedException('Unauthorized !');
		}
		const result = await this.blogRepository.softDelete(id);
		if (result.affected > 0) return 'Removed Blog Id ' + id + ' successfully !';

		throw new NotFoundException('Blog Id ' + id + ' Not Found !');
	}
	async deleteBlog(id: string): Promise<any> {
		const result = await this.blogRepository.delete(id);
		if (result.affected > 0) return 'Deleted Blog Id ' + id + ' successfully !';
		throw new NotFoundException('Blog Id ' + id + ' Not Found !');
	}
	async restoreBlog(id: string): Promise<any> {
		const result = await this.blogRepository.restore(id);
		if (result.affected > 0)
			return 'Restored Blog Id ' + id + ' successfully !';
		throw new NotFoundException('Blog Id ' + id + ' Not Found !');
	}

	async changeStatusBlogByAdmin(
		id: string,
		statusDto: UpdateBlogDto
	): Promise<any> {
		const {status = 0} = statusDto;
		const result = await this.blogRepository.findOne({where: {id}});
		if (!result) throw new NotFoundException('Blog Id ' + id + ' Not Found !');
		result.status = status;
		return this.blogRepository.save(result);
	}
	async countBlog(user: UserDto): Promise<any> {
		const options = {};
		if (user.role === ROLE.PARTNER) {
			options['creatorId'] = user.id;
		}
		const result = await this.blogRepository.count({
			where: options,
		});
		if (!result)
			throw new NotFoundException('Count ' + user.id + ' Not Found !');

		return {count: result};
	}
}
