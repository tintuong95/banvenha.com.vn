import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {PRODUCT_STATE, PRODUCT_STATUS} from '../type/product.type';

@Entity({name: 'products'})
export class Product extends BaseEntity {
	@Column({
		length: 20,
		nullable: false,
	})
	@ApiProperty()
	code: string;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	name: string;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	param: string;

	@Column({
		length: 100,
		nullable: false,
	})
	@ApiProperty()
	description: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	content: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	creator_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	group_id: number;

	@Column({
		type: 'enum',
		enum: PRODUCT_STATUS,
		default: PRODUCT_STATUS.NORMAL,
	})
	@ApiProperty()
	status: PRODUCT_STATUS;

	@Column({
		type: 'enum',
		enum: PRODUCT_STATE,
		default: PRODUCT_STATE.PUBLISHED,
	})
	@ApiProperty()
	state: PRODUCT_STATE;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	image: string;

	// @Column({
	// 	length: 50,
	// 	nullable: false,
	// })
	// @ApiProperty()
	// download: string;

	@Column({
		nullable: false,
		default: 0,
	})
	@ApiProperty()
	likes: number;

	@Column({
		nullable: false,
		default: 0,
	})
	@ApiProperty()
	views: number;

	@Column({
		nullable: false,
		default: 0,
	})
	@ApiProperty()
	price: number;
}
