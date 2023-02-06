import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {OrderRepository} from './repository/order.repository';
import {CreateOrderDto, UpdateOrderDto} from './dto/order.dto';
import {Order} from './entity/order.entity';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(OrderRepository)
		private orderRepository: OrderRepository
	) {}

	async getAllOrders(): Promise<any> {
		try {
			return await this.orderRepository.getAllOrders();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getOrderDetails(id: number): Promise<Order | any> {
		try {
			const result = await this.orderRepository.findOne({id});
			if (!result)
				throw new NotFoundException('Order Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
		try {
			return await this.orderRepository.save(createOrderDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateOrder(
		id: number,
		updateOrderDto: UpdateOrderDto
	): Promise<Order> {
		try {
			const result = await this.orderRepository.updateOrder(id, updateOrderDto);
			if (!result)
				throw new NotFoundException('Order Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeOrder(id: number): Promise<any> {
		try {
			const result = await this.orderRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted Order Id ' + id + ' successfully !';
			throw new NotFoundException('Order Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
