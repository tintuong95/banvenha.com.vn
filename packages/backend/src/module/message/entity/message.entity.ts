import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {MESSAGE_STATUS} from '../type/message';
import {Partner} from '~module/partner/entity/partner.entity';
import {ADMIN_KEY, PARTNER_KEY} from '~contants/relation';
import {Admin} from '~module/admin/entity/admin.entity';

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
	admin_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	partner_id: number;

	@Column({
		type: 'enum',
		nullable: false,
		enum: MESSAGE_STATUS,
		default: MESSAGE_STATUS.NOT_SEEN,
	})
	@ApiProperty()
	status: MESSAGE_STATUS;

	@ManyToOne(() => Partner, {cascade: true})
	@JoinColumn({name: 'partner_id'})
	[PARTNER_KEY]: Partner;

	@ManyToOne(() => Admin, {cascade: true})
	@JoinColumn({name: 'admin_id'})
	[ADMIN_KEY]: Admin;
}
