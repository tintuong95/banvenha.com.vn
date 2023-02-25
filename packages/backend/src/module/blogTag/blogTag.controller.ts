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
import {BlogTagService} from './blogTag.service';
import {CreateBlogTagDto, UpdateBlogTagDto} from './dto/blogTag.dto';
import {BlogTag} from './entity/blogTag.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';

@Controller('BlogTags')
@UseGuards(JwtAuthGuard)
export class BlogTagController {
	constructor(private blogTagService: BlogTagService) {}

	@Get('/list')
	async getAllBlogTags(): Promise<any> {
		return await this.blogTagService.getAllBlogTags();
	}

	@Get(':id/details')
	async getBlogTagDetails(
		@Param('id', ParseIntPipe) id: string
	): Promise<BlogTag> {
		return await this.blogTagService.getBlogTagDetails(id);
	}

	@Post('/create')
	@Roles(ROLE.ADMIN)
	@HttpCode(HttpStatus.CREATED)
	async createBlogTag(
		@Body() createBlogTagDto: CreateBlogTagDto
	): Promise<BlogTag> {
		return await this.blogTagService.createBlogTag(createBlogTagDto);
	}

	@Post(':id/update')
	@Roles(ROLE.ADMIN)
	async updateBlogTag(
		@Body() updateBlogTagDto: UpdateBlogTagDto,
		@Param('id', ParseIntPipe) id: string
	): Promise<BlogTag> {
		return await this.blogTagService.updateBlogTag(id, updateBlogTagDto);
	}

	@Post(':id/remove')
	@Roles(ROLE.ADMIN)
	async removeSoftBlogTag(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.blogTagService.removeBlogTag(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async removeBlogTag(@Param('id', ParseIntPipe) id: string): Promise<string> {
		return await this.blogTagService.deleteBlogTag(id);
	}

	@Post(':id/restore')
	@Roles(ROLE.ADMIN)
	async restoreBlogTag(@Param('id', ParseIntPipe) id: string): Promise<string> {
		return await this.blogTagService.restoreBlogTag(id);
	}
}
