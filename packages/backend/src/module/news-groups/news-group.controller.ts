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
import {NewsGroupService} from './news-group.service';
import {CreateNewsGroupDto, UpdateNewsGroupDto} from './dto/news-group.dto';
import {NewsGroup} from './entity/news-group.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';

@Controller('news-group')
@UseGuards(JwtAuthGuard)
export class NewsGroupController {
	constructor(private newsGroupService: NewsGroupService) {}

	@Get('/list')
	async getAllNewsGroups(): Promise<any> {
		return await this.newsGroupService.getAllNewsGroups();
	}

	@Get(':id/details')
	async getNewsGroupDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<NewsGroup> {
		return await this.newsGroupService.getNewsGroupDetails(id);
	}

	@Post('/create')
	@Roles(ROLE.ADMIN)
	@HttpCode(HttpStatus.CREATED)
	async createNewsGroup(
		@Body() createNewsGroupDto: CreateNewsGroupDto
	): Promise<NewsGroup> {
		return await this.newsGroupService.createNewsGroup(createNewsGroupDto);
	}

	@Post(':id/update')
	@Roles(ROLE.ADMIN)
	async updateNewsGroup(
		@Body() updateNewsGroupDto: UpdateNewsGroupDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<NewsGroup> {
		return await this.newsGroupService.updateNewsGroup(id, updateNewsGroupDto);
	}

	@Post(':id/remove')
	@Roles(ROLE.ADMIN)
	async removeSoftNewsGroup(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.newsGroupService.removeNewsGroup(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async removeNewsGroup(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.newsGroupService.deleteNewsGroup(id);
	}

	@Post(':id/restore')
	@Roles(ROLE.ADMIN)
	async restoreNewsGroup(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.newsGroupService.restoreNewsGroup(id);
	}
}
