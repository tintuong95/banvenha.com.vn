import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateMessageDto, UpdateMessageDto} from './dto/message.dto';
import {Message} from './entity/message.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {
	ADMIN_KEY,
	PARTNER_KEY,
	RECEIVER_KEY,
	SENDER_KEY,
} from '~contants/relation';
import {UserDto} from '~shared/user.dto';
import {Request} from 'express';
import {handleQuery, pagination} from '~util/pagination';
import {findOptionWhere} from '~util/query';
import {ROLE} from '~contants/role';
@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Message)
		private messageRepository: Repository<Message>
	) {}

	async getAllMessages(
		request: Request,
		query: any,
		user: UserDto
	): Promise<any> {
		const {skip, take, currentPage, perPage} = handleQuery(query);
		const newQuery = findOptionWhere(query, ['name']);

		const isPartner = user.role === ROLE.PARTNER;

		if (isPartner) newQuery['receiver_id'] = user.id;
		const result = await this.messageRepository.findAndCount({
			where: newQuery,
			relations: [RECEIVER_KEY, SENDER_KEY],
			take,
			skip,
			withDeleted: user.role === ROLE.ADMIN,
		});
		return pagination(request, result, currentPage, perPage);
	}

	async getMessageDetails(id: string): Promise<Message | any> {
		const result = await this.messageRepository.findOne({
			where: {id},
			relations: [PARTNER_KEY, ADMIN_KEY],
		});
		if (!result)
			throw new NotFoundException('Message Id ' + id + ' Not Found !');
		return result;
	}

	async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
		const result = await this.messageRepository.save(createMessageDto);
		return await this.messageRepository.save(result);
	}

	async updateMessage(
		id: string,
		updateMessageDto: UpdateMessageDto
	): Promise<Message> {
		const result = await this.messageRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('Message Id ' + id + ' Not Found !');
		_(updateMessageDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.messageRepository.save(result);
	}

	async removeMessage(id: string): Promise<any> {
		const result = await this.messageRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed Message Id ' + id + ' successfully !';
		throw new NotFoundException('Message Id ' + id + ' Not Found !');
	}

	async deleteMessage(id: string): Promise<any> {
		const result = await this.messageRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Message Id ' + id + ' successfully !';
		throw new NotFoundException('Message Id ' + id + ' Not Found !');
	}

	async restoreMessage(id: string): Promise<any> {
		const result = await this.messageRepository.restore(id);
		if (result.affected > 0)
			return 'Restored Message Id ' + id + ' successfully !';
		throw new NotFoundException('Message Id ' + id + ' Not Found !');
	}
}
