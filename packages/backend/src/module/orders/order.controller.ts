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
} from '@nestjs/common';
import {OrderService} from './order.service';

import {CreateOrderDto, UpdateOrderDto} from './dto/order.dto';
import {Order} from './entity/order.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
	constructor(private orderService: OrderService) {}
	@Get('list')
	async getAllOrders(): Promise<any> {
		return await this.orderService.getAllOrders();
	}
	@Get(':id/details')
	async getOrderDetails(@Param('id', ParseIntPipe) id: number): Promise<Order> {
		return await this.orderService.getOrderDetails(id);
	}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
		return await this.orderService.createOrder(createOrderDto);
	}

	@Post(':id/update')
	@Roles(ROLE.ADMIN)
	async updateOrder(
		@Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Order> {
		return await this.orderService.updateOrder(id, updateOrderDto);
	}

	@Post(':id/remove')
	@Roles(ROLE.ADMIN)
	async removeOrder(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.orderService.removeOrder(id);
	}

	@Post(':id/restore')
	async restoreOrder(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.orderService.restoreOrder(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.orderService.deleteOrder(id);
	}
}
