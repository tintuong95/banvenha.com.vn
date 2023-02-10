import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateMessageDto, UpdateMessageDto} from './dto/message.dto';
import {Message} from './entity/message.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ADMIN_KEY, PARTNER_KEY} from '~contants/relation';
@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Message)
		private messageRepository: Repository<Message>
	) {}

	async getAllMessages(): Promise<any> {
		return await this.messageRepository.find();
	}

	async getMessageDetails(id: number): Promise<Message | any> {
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
		id: number,
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

	async removeMessage(id: number): Promise<any> {
		const result = await this.messageRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed Message Id ' + id + ' successfully !';
		throw new NotFoundException('Message Id ' + id + ' Not Found !');
	}

	async deleteMessage(id: number): Promise<any> {
		const result = await this.messageRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Message Id ' + id + ' successfully !';
		throw new NotFoundException('Message Id ' + id + ' Not Found !');
	}

	async restoreMessage(id: number): Promise<any> {
		const result = await this.messageRepository.restore(id);
		if (result.affected > 0)
			return 'Restored Message Id ' + id + ' successfully !';
		throw new NotFoundException('Message Id ' + id + ' Not Found !');
	}
}
