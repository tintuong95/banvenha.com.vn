import {
	BaseEntity as ShareEnity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

export class BaseEntity extends ShareEnity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@CreateDateColumn()
	@ApiProperty()
	created_at: Date;

	@UpdateDateColumn()
	@ApiProperty()
	updated_at: Date;

	@DeleteDateColumn()
	@ApiProperty()
	deleted_at: Date;
}
