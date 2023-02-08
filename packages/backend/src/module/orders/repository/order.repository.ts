/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateOrderDto} from '../dto/order.dto';
import {Order} from '../entity/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
	async updateOrder(
		id: number,
		updateOrderDto: UpdateOrderDto
	): Promise<Order | null> {
		const result = await this.findOne({where: {id}});
		if (!result) return null;

		_(updateOrderDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllOrders(): Promise<Order[]> {
		return await this.find();
	}
}
