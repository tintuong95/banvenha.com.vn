import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {MessageRepository} from './repository/message.repository';
import {CreateMessageDto, UpdateMessageDto} from './dto/message.dto';
import {Message} from './entity/message.entity';

@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(MessageRepository)
		private messageRepository: MessageRepository
	) {}

	async getAllMessages(): Promise<any> {
		try {
			return await this.messageRepository.getAllMessages();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getMessageDetails(id: number): Promise<Message | any> {
		try {
			const result = await this.messageRepository.findOne({id});
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
			const result = await this.messageRepository.updateMessage(
				id,
				updateMessageDto
			);
			if (!result)
				throw new NotFoundException('Message Id ' + id + ' Not Found !');
			return result;
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
