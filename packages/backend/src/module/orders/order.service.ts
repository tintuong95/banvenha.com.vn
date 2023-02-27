import {ForbiddenException, Injectable} from '@nestjs/common';
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
import * as moment from 'moment';

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

		if (isPartner) newQuery['accountId'] = user.id;

		const result = await this.orderRepository.findAndCount({
			where: newQuery,
			relations: [ADMIN_KEY, PRODUCT_KEY],
			take,
			skip,
			withDeleted: user.role === ROLE.ADMIN,
		});
		return pagination(request, result, currentPage, perPage);
	}

	async getOrderDetails(id: string): Promise<Order | any> {
		const result = await this.orderRepository.findOne({
			where: {id},
			relations: [ADMIN_KEY, PRODUCT_KEY],
		});
		if (!result) throw new NotFoundException('Order Id ' + id + ' Not Found !');
		return result;
	}

	async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
		return await this.orderRepository.save(createOrderDto);
	}

	async updateOrder(
		id: string,
		updateOrderDto: UpdateOrderDto
	): Promise<Order> {
		const result = await this.orderRepository.findOne({where: {id}});
		if (!result) throw new NotFoundException('Order Id ' + id + ' Not Found !');
		_(updateOrderDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.orderRepository.save(result);
	}

	async removeOrder(id: string): Promise<any> {
		const result = await this.orderRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed Order Id ' + id + ' successfully !';
		throw new NotFoundException('Order Id ' + id + ' Not Found !');
	}

	async restoreOrder(id: string): Promise<any> {
		const result = await this.orderRepository.restore(id);
		if (result.affected > 0)
			return 'Restored Order Id ' + id + ' successfully !';
		throw new NotFoundException('Order Id ' + id + ' Not Found !');
	}

	async deleteOrder(id: string): Promise<any> {
		const result = await this.orderRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Order Id ' + id + ' successfully !';
		throw new NotFoundException('Order Id ' + id + ' Not Found !');
	}

	async revenueMounth(user: UserDto): Promise<any> {
		const currentDate = moment().format('YYYY-MM-DD');
		const afterDate = moment(currentDate).startOf('month').format('YYYY-MM-DD');
		const beforeDate = moment(currentDate).endOf('month').format('YYYY-MM-DD');

		if (user.role === ROLE.PARTNER) {
			return await this.orderRepository
				.createQueryBuilder('orders')
				.where('orders.accountId = :accountId', {accountId: user.id})
				.andWhere('orders.updated_at >= :after', {
					after: afterDate,
				})
				.andWhere('orders.updated_at < :before', {
					before: beforeDate,
				})
				.select('SUM(orders.price)', 'sum')
				.addSelect('COUNT(*)', 'count')
				.getRawOne();
		} else if (user.role === ROLE.ADMIN) {
			return await this.orderRepository
				.createQueryBuilder('orders')
				.where('orders.updated_at >= :after', {
					after: afterDate,
				})
				.andWhere('orders.updated_at < :before', {
					before: beforeDate,
				})
				.select('SUM(orders.price)', 'sum')
				.addSelect('COUNT(*)', 'count')
				.getRawOne();
		}
		throw new ForbiddenException('Forbidden !');
	}

	async revenueTotal(user: UserDto): Promise<any> {
		if (user.role === ROLE.PARTNER) {
			return await this.orderRepository
				.createQueryBuilder('orders')
				.where('orders.accountId = :accountId', {accountId: user.id})
				.select('SUM(orders.price)', 'sum')
				.addSelect('COUNT(*)', 'count')
				.getRawOne();
		} else if (user.role === ROLE.ADMIN) {
			return await this.orderRepository
				.createQueryBuilder('orders')
				.select('SUM(orders.price)', 'sum')
				.addSelect('COUNT(*)', 'count')
				.getRawOne();
		}
		throw new ForbiddenException('Forbidden !');
	}
}
