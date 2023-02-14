import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsEnum, IsOptional, IsNumber} from 'class-validator';
import {MESSAGE_STATUS} from '../type/message.type';

export class CreateMessageDto {
	@IsString()
	@Expose()
	code: string;

	@IsString()
	@Expose()
	name: string;

	@IsString()
	@Expose()
	content: string;

	@IsNumber()
	@Expose()
	sender_id: number;

	@IsNumber()
	@Expose()
	receiver_id: number;

	@IsOptional()
	@IsEnum(MESSAGE_STATUS)
	@Expose()
	status: MESSAGE_STATUS;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
