import {Entity, Column, ManyToOne, JoinColumn, BeforeInsert} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {MESSAGE_STATUS} from '../type/message.type';
import {RECEIVER_KEY, SENDER_KEY} from '~contants/relation';
import {Admin} from '~module/admin/entity/admin.entity';
import {Exclude} from 'class-transformer';
import {generateCode} from '~util/generate';

@Entity({name: 'messages'})
export class Message extends BaseEntity {
	@Column({
		length: 20,
		nullable: false,
	})
	@ApiProperty()
	code: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	name: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	content: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	receiver_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	sender_id: number;

	@Column({
		type: 'enum',
		nullable: false,
		enum: MESSAGE_STATUS,
		default: MESSAGE_STATUS.NOT_SEEN,
	})
	@ApiProperty()
	status: MESSAGE_STATUS;

	@ManyToOne(() => Admin, {cascade: true})
	@JoinColumn({name: 'receiver_id'})
	[RECEIVER_KEY]: Admin;

	@ManyToOne(() => Admin, {cascade: true})
	@JoinColumn({name: 'sender_id'})
	[SENDER_KEY]: Admin;

	@BeforeInsert()
	generateCode() {
		this.code = generateCode('ME');
	}
}
