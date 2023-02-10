import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateOrderDto, UpdateOrderDto} from './dto/order.dto';
import {Order} from './entity/order.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order)
		private orderRepository: Repository<Order>
	) {}

	async getAllOrders(): Promise<any> {
		return await this.orderRepository.find();
	}

	async getOrderDetails(id: number): Promise<Order | any> {
		const result = await this.orderRepository.findOne({where: {id}});
		if (!result) throw new NotFoundException('Order Id ' + id + ' Not Found !');
		return result;
	}

	async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
		return await this.orderRepository.save(createOrderDto);
	}

	async updateOrder(
		id: number,
		updateOrderDto: UpdateOrderDto
	): Promise<Order> {
		const result = await this.orderRepository.findOne({where: {id}});
		if (!result) throw new NotFoundException('Order Id ' + id + ' Not Found !');
		_(updateOrderDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.orderRepository.save(result);
	}

	async removeOrder(id: number): Promise<any> {
		const result = await this.orderRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed Order Id ' + id + ' successfully !';
		throw new NotFoundException('Order Id ' + id + ' Not Found !');
	}

	async restoreOrder(id: number): Promise<any> {
		const result = await this.orderRepository.restore(id);
		if (result.affected > 0)
			return 'Restored Order Id ' + id + ' successfully !';
		throw new NotFoundException('Order Id ' + id + ' Not Found !');
	}

	async deleteOrder(id: number): Promise<any> {
		const result = await this.orderRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Order Id ' + id + ' successfully !';
		throw new NotFoundException('Order Id ' + id + ' Not Found !');
	}
}
