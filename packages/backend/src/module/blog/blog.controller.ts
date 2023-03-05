import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	UseGuards,
	UploadedFile,
	UseInterceptors,
	Query,
	Request,
	UsePipes,
} from '@nestjs/common';
import {BlogService} from './blog.service';
import {Express} from 'express';
import {CreateBlogDto, BlogQueryDto, UpdateBlogDto} from './dto/blog.dto';
import {Blog} from './entity/blog.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {FileInterceptor} from '@nestjs/platform-express';
import {uploadFileConfig} from '~config/multer.config';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';
import {REGEX_IMAGE} from '~util/regex';

@Controller('blog')
@UseGuards(JwtAuthGuard)
export class BlogController {
	constructor(private blogService: BlogService) {}
	@Get('list')
	async getAllBlogs(
		@Query() query: any,
		@Request() req: any,
		@User() user: UserDto
	): Promise<any> {
		return await this.blogService.getAllBlog(req, query, user);
	}

	@Get(':id/details')
	async getBlogDetails(@Param('id') id: string): Promise<Blog> {
		return await this.blogService.getBlogDetails(id);
	}

	@Get(':slug/slug/details')
	async getBlogSlugDetails(@Param('slug') slug: string): Promise<Blog> {
		return await this.blogService.getBlogSlugDetails(slug);
	}

	@Roles(ROLE.PARTNER)
	@Post('create')
	@UseInterceptors(
		FileInterceptor('filePhoto', uploadFileConfig(10000, REGEX_IMAGE))
	)
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new ValidationPipe({transform: true}))
	async createBlog(
		@Body() createBlogDto: any,
		@UploadedFile() filePhoto: Express.Multer.File,
		@User() user: UserDto
	): Promise<Blog> {
		const {id} = user;
		return await this.blogService.createBlog(createBlogDto, filePhoto, id);
	}

	@Roles(ROLE.PARTNER)
	@Post(':id/update')
	@UseInterceptors(
		FileInterceptor('photo', uploadFileConfig(1000, REGEX_IMAGE))
	)
	async updateBlog(
		@Body(ValidationPipe) updateBlogDto: UpdateBlogDto,
		@Param('id') id: string,
		@User() user: UserDto,
		@UploadedFile() photo: Express.Multer.File
	): Promise<Blog> {
		return await this.blogService.updateBlog(id, updateBlogDto, photo, user.id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteBlog(@Param('id') id: string): Promise<string> {
		return await this.blogService.deleteBlog(id);
	}

	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	@Post(':id/remove')
	async removeBlog(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.blogService.removeBlog(id, user.id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreBlog(@Param('id') id: string): Promise<string> {
		return await this.blogService.restoreBlog(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/status')
	async changeStatusBlog(
		@Param('id') id: string,
		@Body() statusDto: UpdateBlogDto
	): Promise<string> {
		return await this.blogService.changeStatusBlogByAdmin(id, statusDto);
	}

	@Get('/count')
	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	async countProduct(@User() user: UserDto): Promise<string> {
		return await this.blogService.countBlog(user);
	}
}
