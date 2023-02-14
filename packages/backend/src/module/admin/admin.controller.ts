import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	ValidationPipe,
	UseGuards,
	Query,
	Request,
} from '@nestjs/common';
import {Request as RequestExpress} from 'express';
import {ROLE} from '~contants/role';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';
import {AdminService} from './admin.service';
import {UpdateAdminDto} from './dto/admin.dto';
import {Admin} from './entity/admin.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
	constructor(private adminService: AdminService) {}

	@Get('list')
	@Roles(ROLE.ADMIN)
	async getAllAdmins(
		@Query() query: any,
		@Request() req: RequestExpress,
		@User() user: UserDto
	): Promise<any> {
		return await this.adminService.getAllAdmins(req, query, user);
	}
	@Get(':id/details')
	@Roles(ROLE.ADMIN)
	async getAdminDetails(@Param('id', ParseIntPipe) id: number): Promise<Admin> {
		return await this.adminService.getAdminDetails(id);
	}

	// @Post('signup')
	// @HttpCode(HttpStatus.CREATED)
	// async signUp(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
	// 	return await this.adminService.signUp(createAdminDto);
	// }

	@Post(':id/update')
	@Roles(ROLE.ADMIN)
	async updateAdmin(
		@Body(ValidationPipe) updateAdminDto: UpdateAdminDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Admin> {
		return await this.adminService.updateAdmin(id, updateAdminDto);
	}

	@Post(':id/remove')
	@Roles(ROLE.ADMIN)
	async removeAdmin(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.adminService.removeAdmin(id);
	}

	@Post(':id/restore')
	@Roles(ROLE.ADMIN)
	async restoreAdmin(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.adminService.restoreAdmin(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.adminService.deleteAdmin(id);
	}

	// @Post('signin')
	// async signIn(@Body() signInAdminDto: SignInAdminDto): Promise<any> {
	// 	return await this.adminService.signIn(signInAdminDto);
	// }
}
