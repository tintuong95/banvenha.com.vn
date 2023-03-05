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
import {BlogGroupService} from './blogGroup.service';
import {CreateBlogGroupDto, UpdateBlogGroupDto} from './dto/blogGroup.dto';
import {BlogGroup} from './entity/blogGroup.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';

@Controller('blogGroup')
@UseGuards(JwtAuthGuard)
export class BlogGroupController {
	constructor(private blogGroupService: BlogGroupService) {}

	@Get('/list')
	async getAllBlogGroups(): Promise<any> {
		return await this.blogGroupService.getAllBlogGroups();
	}

	@Get(':id/details')
	async getBlogGroupDetails(
		@Param('id', ParseIntPipe) id: string
	): Promise<BlogGroup> {
		return await this.blogGroupService.getBlogGroupDetails(id);
	}

	@Post('/create')
	@Roles(ROLE.ADMIN)
	@HttpCode(HttpStatus.CREATED)
	async createBlogGroup(
		@Body() createBlogGroupDto: CreateBlogGroupDto
	): Promise<BlogGroup> {
		return await this.blogGroupService.createBlogGroup(createBlogGroupDto);
	}

	@Post(':id/update')
	@Roles(ROLE.ADMIN)
	async updateBlogGroup(
		@Body() updateBlogGroupDto: UpdateBlogGroupDto,
		@Param('id', ParseIntPipe) id: string
	): Promise<BlogGroup> {
		return await this.blogGroupService.updateBlogGroup(id, updateBlogGroupDto);
	}

	@Post(':id/remove')
	@Roles(ROLE.ADMIN)
	async removeSoftBlogGroup(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.blogGroupService.removeBlogGroup(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async removeBlogGroup(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.blogGroupService.deleteBlogGroup(id);
	}

	@Post(':id/restore')
	@Roles(ROLE.ADMIN)
	async restoreBlogGroup(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.blogGroupService.restoreBlogGroup(id);
	}
}
