import {
	BaseEntity as ShareEnity,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

export class BaseEntity extends ShareEnity {
	@CreateDateColumn()
	@ApiProperty()
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty()
	updatedAt: Date;

	@DeleteDateColumn()
	@ApiProperty()
	deletedAt: Date;
}
