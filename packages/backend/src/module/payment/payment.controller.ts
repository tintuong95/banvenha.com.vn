import {
	Body,
	Controller,
	Get,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	UseGuards,
	Query,
	Request,
	Param,
} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {CreatePaymentDto, UpdatePaymentDto} from './dto/payement.dto';
import {Payment} from './entity/payment.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
	constructor(private paymentService: PaymentService) {}
	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	@Get('list')
	async getAllPayments(
		@Query() query: any,
		@Request() req: any,
		@User() user: UserDto
	): Promise<any> {
		return await this.paymentService.getAllPayments(req, query, user);
	}

	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	@Get(':id/details')
	async getPaymentDetails(@Param('id') id: string): Promise<Payment> {
		return await this.paymentService.getPaymentDetails(id);
	}

	@Roles(ROLE.ADMIN)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createPayment(
		@Body() createPaymentDto: CreatePaymentDto
	): Promise<Payment> {
		return await this.paymentService.createPayment(createPaymentDto);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/update')
	async updatePayment(
		@Body(ValidationPipe) updatePaymentDto: UpdatePaymentDto,
		@Param('id') id: string
	): Promise<Payment> {
		return await this.paymentService.updatePayment(id, updatePaymentDto);
	}

	@Roles(ROLE.ADMIN, ROLE.PARTNER)
	@Post(':id/remove')
	async removePayment(@Param('id') id: string): Promise<string> {
		return await this.paymentService.removePayment(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restorePayment(@Param('id') id: string): Promise<string> {
		return await this.paymentService.restorePayment(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deletePayment(@Param('id') id: string): Promise<string> {
		return await this.paymentService.deletePayment(id);
	}
}
