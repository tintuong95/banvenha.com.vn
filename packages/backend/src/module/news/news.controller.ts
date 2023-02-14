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
import {NewsService} from './news.service';
import {Express} from 'express';
import {CreateNewsDto, NewsQueryDto, UpdateNewsDto} from './dto/news.dto';
import {News} from './entity/news.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {FileInterceptor} from '@nestjs/platform-express';
import {uploadFileConfig} from '~config/multer.config';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';

@Controller('news')
@UseGuards(JwtAuthGuard)
export class NewsController {
	constructor(private newsService: NewsService) {}
	@Get('list')
	async getAllNewss(
		@Query() query: any,
		@Request() req: any,
		@User() user: UserDto
	): Promise<any> {
		return await this.newsService.getAllNews(req, query, user);
	}
	@Get(':id/details')
	async getNewsDetails(@Param('id', ParseIntPipe) id: number): Promise<News> {
		return await this.newsService.getNewsDetails(id);
	}

	@Roles(ROLE.PARTNER)
	@Post('create')
	@UseInterceptors(
		FileInterceptor(
			'file',
			uploadFileConfig(1048576, /\/(jpg|jpeg|png|gif)$/, 'images/news')
		)
	)
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new ValidationPipe({transform: true}))
	async createNews(
		@Body() createNewsDto: any,
		@UploadedFile() file: Express.Multer.File,
		@User() user: UserDto
	): Promise<News> {
		console.log('createNewsDto', createNewsDto);
		const {id} = user;
		return await this.newsService.createNews(createNewsDto, file, id);
	}

	@Roles(ROLE.PARTNER)
	@Post(':id/update')
	@UseInterceptors(
		FileInterceptor(
			'file',
			uploadFileConfig(1048576, /\/(jpg|jpeg|png|gif)$/, 'images/news')
		)
	)
	async updateNews(
		@Body(ValidationPipe) updateNewsDto: UpdateNewsDto,
		@Param('id', ParseIntPipe) id: number,
		@User() user: UserDto,
		@UploadedFile() file: Express.Multer.File
	): Promise<News> {
		return await this.newsService.updateNews(id, updateNewsDto, file, user.id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteNews(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.newsService.deleteNews(id);
	}

	@Roles(ROLE.PARTNER)
	@Post(':id/remove')
	async removeNews(
		@Param('id', ParseIntPipe) id: number,
		@User() user: UserDto
	): Promise<string> {
		return await this.newsService.removeNews(id, user.id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreNews(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.newsService.restoreNews(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/status')
	async changeStatusNews(
		@Param('id', ParseIntPipe) id: number,
		@Body() statusDto: UpdateNewsDto
	): Promise<string> {
		return await this.newsService.changeStatusNewsByAdmin(id, statusDto);
	}
}
