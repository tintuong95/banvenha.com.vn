import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	UseGuards,
	Query,
	Request,
} from '@nestjs/common';
import {OrderService} from './order.service';

import {CreateOrderDto, UpdateOrderDto} from './dto/order.dto';
import {Order} from './entity/order.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
	constructor(private orderService: OrderService) {}
	@Get('list')
	async getAllOrders(
		@Query() query: any,
		@Request() req: any,
		@User() user: UserDto
	): Promise<any> {
		return await this.orderService.getAllOrders(req, query, user);
	}
	@Get(':id/details')
	async getOrderDetails(@Param('id') id: string): Promise<Order> {
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
		@Param('id') id: string
	): Promise<Order> {
		return await this.orderService.updateOrder(id, updateOrderDto);
	}

	@Post(':id/remove')
	@Roles(ROLE.ADMIN)
	async removeOrder(@Param('id') id: string): Promise<string> {
		return await this.orderService.removeOrder(id);
	}

	@Post(':id/restore')
	async restoreOrder(@Param('id') id: string): Promise<string> {
		return await this.orderService.restoreOrder(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async deleteOrder(@Param('id') id: string): Promise<string> {
		return await this.orderService.deleteOrder(id);
	}

	@Get('/revenue/month')
	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	async revenueMonth(@User() user: UserDto): Promise<any> {
		return await this.orderService.revenueMounth(user);
	}

	@Get('/revenue/total')
	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	async revenueTotal(@User() user: UserDto): Promise<any> {
		return await this.orderService.revenueTotal(user);
	}
}
