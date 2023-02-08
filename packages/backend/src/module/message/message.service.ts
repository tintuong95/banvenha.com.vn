import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
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
		try {
			return await this.messageRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getMessageDetails(id: number): Promise<Message | any> {
		try {
			const result = await this.messageRepository.findOne({
				where: {id},
				relations: [PARTNER_KEY, ADMIN_KEY],
			});
			if (!result)
				throw new NotFoundException('Message Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
		try {
			return await this.messageRepository.save(createMessageDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateMessage(
		id: number,
		updateMessageDto: UpdateMessageDto
	): Promise<Message> {
		try {
			const result = await this.messageRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Message Id ' + id + ' Not Found !');
			_(updateMessageDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.messageRepository.save(result);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeMessage(id: number): Promise<any> {
		try {
			const result = await this.messageRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted Message Id ' + id + ' successfully !';
			throw new NotFoundException('Message Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
