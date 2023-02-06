import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {PARTNER_STATUS} from '../type/partner.type';

@Entity({name: 'partners'})
export class Partner extends BaseEntity {
	@Column({length: 20, nullable: false})
	@ApiProperty()
	name: string;

	@Column({length: 20, nullable: false})
	@ApiProperty()
	nickname: string;

	@Column({length: 100, nullable: false})
	@ApiProperty()
	address: string;

	@Column({length: 20, nullable: false})
	@ApiProperty()
	tel: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	avatar: string;

	@Column({length: 25, nullable: false})
	@ApiProperty()
	email: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_code: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_name: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_account_type: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_account_number: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	bank_holder: string;

	// @Column({length: 20, nullable: true})
	// @ApiProperty()
	// province: string;

	// @Column({length: 20, nullable: true})
	// @ApiProperty()
	// district: string;

	// @Column({length: 20, nullable: true})
	// @ApiProperty()
	// ward: string;

	@Column({
		type: 'enum',
		enum: PARTNER_STATUS,
		default: PARTNER_STATUS.NORMAL,
	})
	@ApiProperty()
	status: PARTNER_STATUS;
}
