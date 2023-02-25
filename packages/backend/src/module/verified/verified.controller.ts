import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import {ROLE} from '~contants/role';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {VerifiedService} from './verified.service';
import {UpdateVerifiedDto} from './dto/verified.dto';
import {Verified} from './entity/verified.entity';

@Controller('verified')
@UseGuards(JwtAuthGuard)
export class VerifiedController {
	constructor(private verifiedService: VerifiedService) {}

	// @Get('list')
	// @Roles(ROLE.ADMIN)
	// async getAllVerifieds(): Promise<any> {
	// 	return await this.verifiedService.getAllVerifieds();
	// }
	// @Get(':id/details')
	// @Roles(ROLE.ADMIN)
	// async getVerifiedDetails(
	// 	@Param('id', ParseIntPipe) id: number
	// ): Promise<Verified> {
	// 	return await this.verifiedService.getVerifiedDetails(id);
	// }

	// @Post('signup')
	// @HttpCode(HttpStatus.CREATED)
	// async signUp(@Body() createVerifiedDto: CreateVerifiedDto): Promise<Verified> {
	// 	return await this.verifiedService.signUp(createVerifiedDto);
	// }

	// @Post(':id/update')
	// @Roles(ROLE.ADMIN)
	// async updateVerified(
	// 	@Body(ValidationPipe) updateVerifiedDto: UpdateVerifiedDto,
	// 	@Param('id', ParseIntPipe) id: number
	// ): Promise<Verified> {
	// 	return await this.verifiedService.updateVerified(id, updateVerifiedDto);
	// }

	// @Post(':id/remove')
	// @Roles(ROLE.ADMIN)
	// async removeVerified(@Param('id') id: string): Promise<string> {
	// 	return await this.verifiedService.removeVerified(id);
	// }

	// @Post(':id/restore')
	// @Roles(ROLE.ADMIN)
	// async restoreVerified(@Param('id') id: string): Promise<string> {
	// 	return await this.verifiedService.restoreVerified(id);
	// }

	// @Post(':id/delete')
	// @Roles(ROLE.ADMIN)
	// async deleteVerified(@Param('id') id: string): Promise<string> {
	// 	return await this.verifiedService.deleteVerified(id);
	// }

	// @Post('signin')
	// async signIn(@Body() signInVerifiedDto: SignInVerifiedDto): Promise<any> {
	// 	return await this.verifiedService.signIn(signInVerifiedDto);
	// }
}
