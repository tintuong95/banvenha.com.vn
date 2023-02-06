import {PartialType} from '@nestjs/mapped-types';
import {Expose} from 'class-transformer';
import {IsString, IsEnum} from 'class-validator';
import {MESSAGE_STATUS} from '../type/message';

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

	@IsEnum(MESSAGE_STATUS)
	@Expose()
	email: MESSAGE_STATUS;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
