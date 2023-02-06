import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	ValidationPipe,
	HttpStatus,
	HttpCode,
} from '@nestjs/common';
import {MessageService} from './message.service';

import {CreateMessageDto, UpdateMessageDto} from './dto/message.dto';
import {Message} from './entity/message.entity';

@Controller('Message')
export class MessageController {
	constructor(private messageService: MessageService) {}
	@Get('')
	async getAllMessages(): Promise<any> {
		return await this.messageService.getAllMessages();
	}
	@Get(':id')
	async getMessageDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<Message> {
		return await this.messageService.getMessageDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createMessage(
		@Body() createMessageDto: CreateMessageDto
	): Promise<Message> {
		return await this.messageService.createMessage(createMessageDto);
	}

	@Put(':id')
	async updateMessage(
		@Body(ValidationPipe) updateMessageDto: UpdateMessageDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Message> {
		return await this.messageService.updateMessage(id, updateMessageDto);
	}

	@Delete(':id')
	async removeMessage(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.messageService.removeMessage(id);
	}
}
