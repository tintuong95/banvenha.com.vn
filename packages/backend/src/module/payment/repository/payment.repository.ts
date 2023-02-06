/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdatePaymentDto} from '../dto/payement.dto';

import {Payment} from '../entity/payment.entity';

/**Import end*/

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
	/**
	 *  @Param {number} id
	 *  @Param {updatePaymentDto} UpdatePaymentDto
	 *  @Return {Payment} Payment || null
	 */
	async updatePayment(
		id: number,
		updatePaymentDto: UpdatePaymentDto
	): Promise<Payment | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updatePaymentDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllPayments(): Promise<Payment[]> {
		return await this.find();
	}
}
