import {Injectable, Query, Request} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreatePaymentDto, UpdatePaymentDto} from './dto/payement.dto';
import {Payment} from './entity/payment.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';
import {handleQuery, pagination} from '~util/pagination';
import {findOptionWhere} from '~util/query';
import {ADMIN_KEY, PRODUCT_KEY} from '~contants/relation';
import {ROLE} from '~contants/role';
import {Request as RequestEx} from 'express';
@Injectable()
export class PaymentService {
	constructor(
		@InjectRepository(Payment)
		private paymentRepository: Repository<Payment>
	) {}

	async getAllPayments(
		requset: RequestEx,
		query: any,
		user: UserDto
	): Promise<any> {
		const {skip, take, currentPage, perPage} = handleQuery(query);

		const newQuery = findOptionWhere(query, ['name']);

		const isPartner = user.role === ROLE.PARTNER;

		if (isPartner) newQuery['admin_id'] = user.id;

		const result = await this.paymentRepository.findAndCount({
			where: newQuery,
			relations: [ADMIN_KEY],
			take,
			skip,
			// withDeleted: user.role === ROLE.ADMIN,
		});
		return pagination(requset, result, currentPage, perPage);
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
