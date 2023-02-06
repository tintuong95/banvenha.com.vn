import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity({name: 'product_images'})
export class ProductImages extends BaseEntity {
	@Column({
		nullable: false,
	})
	@ApiProperty()
	product_id: number;

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
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	path: string;
}
