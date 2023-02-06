import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity({name: 'product_files'})
export class ProductFiles extends BaseEntity {
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
	path: string;

	@Column({
		length: 20,
		nullable: false,
	})
	@ApiProperty()
	type: string;
}
