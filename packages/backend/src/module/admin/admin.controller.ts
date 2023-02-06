import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	ValidationPipe,
	HttpStatus,
	HttpCode,
} from '@nestjs/common';
import {AdminService} from './admin.service';
import {CreateAdminDto, UpdateAdminDto} from './dto/admin.dto';
import {Admin} from './entity/admin.entity';

@Controller('admin')
export class AdminController {
	constructor(private adminService: AdminService) {}
	@Get('')
	async getAllAdmins(): Promise<any> {
		return await this.adminService.getAllAdmins();
	}
	@Get(':id')
	async getAdminDetails(@Param('id', ParseIntPipe) id: number): Promise<Admin> {
		return await this.adminService.getAdminDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
		return await this.adminService.createAdmin(createAdminDto);
	}

	@Put(':id')
	async updateAdmin(
		@Body(ValidationPipe) updateAdminDto: UpdateAdminDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Admin> {
		return await this.adminService.updateAdmin(id, updateAdminDto);
	}

	@Delete(':id')
	async removeAdmin(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.adminService.removeAdmin(id);
	}
}
