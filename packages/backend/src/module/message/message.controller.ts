import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	UseGuards,
	Query,
	Request,
} from '@nestjs/common';
import {MessageService} from './message.service';
import {CreateMessageDto, UpdateMessageDto} from './dto/message.dto';
import {Message} from './entity/message.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
	constructor(private messageService: MessageService) {}

	@Get('list')
	async getAllMessages(
		@Query() query: any,
		@Request() req: any,
		@User() user: UserDto
	): Promise<any> {
		return await this.messageService.getAllMessages(req, query, user);
	}

	@Get(':id/details')
	async getMessageDetails(@Param('id') id: string): Promise<Message> {
		return await this.messageService.getMessageDetails(id);
	}

	// @Roles(ROLE.ADMIN)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createMessage(
		@Body() createMessageDto: CreateMessageDto
	): Promise<Message> {
		return await this.messageService.createMessage(createMessageDto);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/update')
	async updateMessage(
		@Body(ValidationPipe) updateMessageDto: UpdateMessageDto,
		@Param('id') id: string
	): Promise<Message> {
		return await this.messageService.updateMessage(id, updateMessageDto);
	}

	@Roles(ROLE.ADMIN, ROLE.PARTNER)
	@Post(':id/remove')
	async removeMessage(@Param('id') id: string): Promise<string> {
		return await this.messageService.removeMessage(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteMessage(@Param('id') id: string): Promise<string> {
		return await this.messageService.deleteMessage(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreMessage(@Param('id') id: string): Promise<string> {
		return await this.messageService.restoreMessage(id);
	}
}
