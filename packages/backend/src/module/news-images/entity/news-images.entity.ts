import {Entity, Column} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {Exclude} from 'class-transformer';

@Entity({name: 'news_images'})
export class NewsImage extends BaseEntity {
	@Column({nullable: false})
	@Exclude()
	@ApiProperty()
	news_id: number;

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
