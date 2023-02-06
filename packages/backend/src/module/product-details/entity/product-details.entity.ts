import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity({name: 'product_details'})
export class ProductDetails extends BaseEntity {
	@Column({
		nullable: false,
	})
	@ApiProperty()
	product_id: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	floor: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	bedroom: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	width: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	long: number;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	area: number;
}
