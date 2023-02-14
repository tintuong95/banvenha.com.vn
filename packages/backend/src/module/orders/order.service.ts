import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateOrderDto, UpdateOrderDto} from './dto/order.dto';
import {Order} from './entity/order.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {handleQuery, pagination} from '~util/pagination';
import {findOptionWhere} from '~util/query';
import {ADMIN_KEY, PRODUCT_KEY} from '~contants/relation';
import {Request} from 'express';
import {UserDto} from '~shared/user.dto';
import {ROLE} from '~contants/role';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order)
		private orderRepository: Repository<Order>
	) {}

	async getAllOrders(
		request: Request,
		query: any,
		user: UserDto
	): Promise<any> {
		const {skip, take, currentPage, perPage} = handleQuery(query);

		const newQuery = findOptionWhere(query, ['code', 'name']);

		const isPartner = user.role === ROLE.PARTNER;

		if (isPartner) newQuery['admin_id'] = user.id;

		const result = await this.orderRepository.findAndCount({
			where: newQuery,
			relations: [ADMIN_KEY, PRODUCT_KEY],
			take,
			skip,
			withDeleted: user.role === ROLE.ADMIN,
		});
		return pagination(request, result, currentPage, perPage);
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
