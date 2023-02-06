import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreatePaymentDto, UpdatePaymentDto} from './dto/payement.dto';
import {Payment} from './entity/payment.entity';
import {Repository} from 'typeorm';
import _ from 'lodash';
@Injectable()
export class PaymentService {
	constructor(
		@InjectRepository(Payment)
		private paymentRepository: Repository<Payment>
	) {}

	async getAllPayments(): Promise<any> {
		try {
			return await this.paymentRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getPaymentDetails(id: number): Promise<Payment | any> {
		try {
			const result = await this.paymentRepository.findOne({id});
			if (!result)
				throw new NotFoundException('Payment Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
		try {
			return await this.paymentRepository.save(createPaymentDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updatePayment(
		id: number,
		updatePaymentDto: UpdatePaymentDto
	): Promise<Payment> {
		try {
			const result = await this.paymentRepository.findOne({id});
			if (!result)
				throw new NotFoundException('Payment Id ' + id + ' Not Found !');

			_(updatePaymentDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.paymentRepository.save(result);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removePayment(id: number): Promise<any> {
		try {
			const result = await this.paymentRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted Payment Id ' + id + ' successfully !';
			throw new NotFoundException('Payment Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
