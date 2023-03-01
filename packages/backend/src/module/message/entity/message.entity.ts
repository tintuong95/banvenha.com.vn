import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn,
	BeforeInsert,
	PrimaryColumn,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {MESSAGE_STATUS} from '../type/message.type';
import {RECEIVER_RELATION, SENDER_RELATION} from '~contants/relation';
import {Exclude} from 'class-transformer';
import {generateId} from '~util/generate';
import {Account} from '~module/account/entity/account.entity';

@Entity({name: 'messages'})
export class Message extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
	})
	@ApiProperty()
	id: string;

	@Column({
		nullable: false,
		length: 200,
	})
	@ApiProperty()
	title: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	content: string;

	@Column({
		nullable: false,
		length: 25,
	})
	@ApiProperty()
	@Exclude()
	receiverId: string;

	@Column({
		nullable: false,
		length: 25,
	})
	@ApiProperty()
	@Exclude()
	senderId: string;

	@Column({
		type: 'enum',
		nullable: false,
		enum: MESSAGE_STATUS,
		default: MESSAGE_STATUS.NOT_SEEN,
	})
	@ApiProperty()
	status: MESSAGE_STATUS;

	@ManyToOne(() => Account, {cascade: true})
	@JoinColumn({name: 'receiverId'})
	[RECEIVER_RELATION]: Account;

	@ManyToOne(() => Account, {cascade: true})
	@JoinColumn({name: 'senderId'})
	[SENDER_RELATION]: Account;

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}
}
