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
import {OrderService} from './order.service';

import {CreateOrderDto, UpdateOrderDto} from './dto/order.dto';
import {Order} from './entity/order.entity';

@Controller('order')
export class OrderController {
	constructor(private orderService: OrderService) {}
	@Get('')
	async getAllOrders(): Promise<any> {
		return await this.orderService.getAllOrders();
	}
	@Get(':id')
	async getOrderDetails(@Param('id', ParseIntPipe) id: number): Promise<Order> {
		return await this.orderService.getOrderDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
		return await this.orderService.createOrder(createOrderDto);
	}

	@Put(':id')
	async updateOrder(
		@Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Order> {
		return await this.orderService.updateOrder(id, updateOrderDto);
	}

	@Delete(':id')
	async removeOrder(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.orderService.removeOrder(id);
	}
}
