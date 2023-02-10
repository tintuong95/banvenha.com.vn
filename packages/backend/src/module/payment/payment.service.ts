import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreatePaymentDto, UpdatePaymentDto} from './dto/payement.dto';
import {Payment} from './entity/payment.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
@Injectable()
export class PaymentService {
	constructor(
		@InjectRepository(Payment)
		private paymentRepository: Repository<Payment>
	) {}

	async getAllPayments(): Promise<any> {
		return await this.paymentRepository.find();
	}

	async getPaymentDetails(id: number): Promise<Payment | any> {
		const result = await this.paymentRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('Payment Id ' + id + ' Not Found !');
		return result;
	}

	async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
		return await this.paymentRepository.save(createPaymentDto);
	}

	async updatePayment(
		id: number,
		updatePaymentDto: UpdatePaymentDto
	): Promise<Payment> {
		const result = await this.paymentRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('Payment Id ' + id + ' Not Found !');

		_(updatePaymentDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.paymentRepository.save(result);
	}

	async removePayment(id: number): Promise<any> {
		const result = await this.paymentRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed Payment Id ' + id + ' successfully !';
		throw new NotFoundException('Payment Id ' + id + ' Not Found !');
	}

	async deletePayment(id: number): Promise<any> {
		const result = await this.paymentRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Payment Id ' + id + ' successfully !';
		throw new NotFoundException('Payment Id ' + id + ' Not Found !');
	}

	async restorePayment(id: number): Promise<any> {
		const result = await this.paymentRepository.restore(id);
		if (result.affected > 0)
			return 'Restored Payment Id ' + id + ' successfully !';
		throw new NotFoundException('Payment Id ' + id + ' Not Found !');
	}
}
