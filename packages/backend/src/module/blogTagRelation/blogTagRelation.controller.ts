import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	HttpStatus,
	HttpCode,
	UseGuards,
} from '@nestjs/common';
import {BlogTagRelationService} from './blogTagRelation.service';
import {
	CreateBlogTagRelationDto,
	UpdateBlogTagRelationDto,
} from './dto/blogTag.dto';
import {BlogTagRelation} from './entity/bogTagRelation.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';

@Controller('newsGroup')
@UseGuards(JwtAuthGuard)
export class BlogTagRelationController {
	constructor(private newsGroupService: BlogTagRelationService) {}

	@Get('/list')
	async getAllBlogTagRelations(): Promise<any> {
		return await this.newsGroupService.getAllBlogTagRelations();
	}

	@Get(':id/details')
	async getBlogTagRelationDetails(
		@Param('id', ParseIntPipe) id: string
	): Promise<BlogTagRelation> {
		return await this.newsGroupService.getBlogTagRelationDetails(id);
	}

	@Post('/create')
	@Roles(ROLE.ADMIN)
	@HttpCode(HttpStatus.CREATED)
	async createBlogTagRelation(
		@Body() createBlogTagRelationDto: CreateBlogTagRelationDto
	): Promise<BlogTagRelation> {
		return await this.newsGroupService.createBlogTagRelation(
			createBlogTagRelationDto
		);
	}

	@Post(':id/update')
	@Roles(ROLE.ADMIN)
	async updateBlogTagRelation(
		@Body() updateBlogTagRelationDto: UpdateBlogTagRelationDto,
		@Param('id', ParseIntPipe) id: string
	): Promise<BlogTagRelation> {
		return await this.newsGroupService.updateBlogTagRelation(
			id,
			updateBlogTagRelationDto
		);
	}

	@Post(':id/remove')
	@Roles(ROLE.ADMIN)
	async removeSoftBlogTagRelation(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.newsGroupService.removeBlogTagRelation(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async removeBlogTagRelation(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.newsGroupService.deleteBlogTagRelation(id);
	}

	@Post(':id/restore')
	@Roles(ROLE.ADMIN)
	async restoreBlogTagRelation(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.newsGroupService.restoreBlogTagRelation(id);
	}
}
