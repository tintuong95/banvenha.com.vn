import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity({name: 'orders'})
export class Order extends BaseEntity {
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
	product_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	partner_id: number;

	@Column({
		length: 20,
		nullable: false,
	})
	@ApiProperty()
	email: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	price: number;
}
