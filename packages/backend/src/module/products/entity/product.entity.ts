import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn,
	OneToOne,
	BeforeInsert,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {PRODUCT_STATE, PRODUCT_STATUS} from '../type/product.type';
import {Admin} from '~module/admin/entity/admin.entity';
import {
	GROUP_PRODUCT_KEY,
	ORDER_KEY,
	ADMIN_KEY,
	PRODUCT_DETAIL_KEY,
	PRODUCT_FILE_KEY,
	PRODUCT_KEY,
	PRODUCT_IMAGES_KEY,
} from '~contants/relation';
import {ProductDetails} from '~module/product-details/entity/product-details.entity';
import {ProductFiles} from '~module/product-files/entity/product-files.entity';
import {ProductGroup} from '~module/product-groups/entity/product-group.entity';
import {Order} from '~module/orders/entity/order.entity';
import {Exclude} from 'class-transformer';
import {generateCode, generateId} from '~util/generate';
import {ProductImages} from '~module/product-images/entity/product-images.entity';

@Entity({name: 'products'})
export class Product extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: 25,
		unique: true,
		default: () => generateId('PR'),
	})
	@ApiProperty()
	id: string;

	@Column({
		length: 200,
		nullable: false,
	})
	@ApiProperty()
	title: string;

	@Column({
		length: 200,
		nullable: false,
	})
	@ApiProperty()
	slug: string;

	@Column({
		length: 500,
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
	@Exclude()
	@ApiProperty()
	creatorId: string;

	@Column({
		nullable: false,
	})
	@ApiProperty()
	@Exclude()
	groupId: string;

	@Column({
		type: 'enum',
		enum: PRODUCT_STATUS,
		default: PRODUCT_STATUS.PROCESS,
	})
	@ApiProperty()
	status: PRODUCT_STATUS;

	@Column({})
	@ApiProperty()
	published: boolean;

	@Column({
		length: 50,
		nullable: false,
	})
	@ApiProperty()
	photo: string;

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

	@Column({
		nullable: false,
		default: 0,
	})
	@ApiProperty()
	sale: number;

	@Column({
		nullable: false,
		default: 0,
	})
	@ApiProperty()
	listPhoto: string;

	@ManyToOne(() => Admin, {cascade: true})
	@JoinColumn({name: 'creator_id', referencedColumnName: 'id'})
	[ADMIN_KEY]: Admin;

	@OneToOne(
		() => ProductDetails,
		(productDetails) => productDetails[PRODUCT_KEY]
	)
	[PRODUCT_DETAIL_KEY]: ProductDetails;

	@OneToOne(() => ProductFiles, (productFile) => productFile[PRODUCT_KEY])
	[PRODUCT_FILE_KEY]: ProductFiles;

	@ManyToOne(() => ProductGroup, {cascade: true})
	@JoinColumn({name: 'group_id'})
	[GROUP_PRODUCT_KEY]: ProductGroup;

	@OneToOne(() => Order, (order) => order[PRODUCT_KEY])
	[ORDER_KEY]: Order;

	@OneToMany(() => ProductImages, (images) => images[PRODUCT_KEY])
	[PRODUCT_IMAGES_KEY]: ProductImages;

	@BeforeInsert()
	generateCode() {
		this.code = generateCode('BP');
	}
}
