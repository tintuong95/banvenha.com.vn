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
import {PaymentService} from './payment.service';
import {CreatePaymentDto, UpdatePaymentDto} from './dto/payement.dto';

import {Payment} from './entity/payment.entity';

@Controller('Payment')
export class PaymentController {
	constructor(private paymentService: PaymentService) {}
	@Get('')
	async getAllPayments(): Promise<any> {
		return await this.paymentService.getAllPayments();
	}
	@Get(':id')
	async getPaymentDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<Payment> {
		return await this.paymentService.getPaymentDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createPayment(
		@Body() createPaymentDto: CreatePaymentDto
	): Promise<Payment> {
		return await this.paymentService.createPayment(createPaymentDto);
	}

	@Put(':id')
	async updatePayment(
		@Body(ValidationPipe) updatePaymentDto: UpdatePaymentDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Payment> {
		return await this.paymentService.updatePayment(id, updatePaymentDto);
	}

	@Delete(':id')
	async removePayment(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.paymentService.removePayment(id);
	}
}
