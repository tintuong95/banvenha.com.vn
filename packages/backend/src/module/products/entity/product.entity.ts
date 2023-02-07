import {Entity, Column, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {PRODUCT_STATE, PRODUCT_STATUS} from '../type/product.type';
import {Partner} from '~module/partner/entity/partner.entity';
import {
	GROUP_PRODUCT_KEY,
	ORDER_KEY,
	PARTNER_KEY,
	PRODUCT_DETAIL_KEY,
	PRODUCT_FILE_KEY,
	PRODUCT_KEY,
} from '~contants/relation';
import {ProductDetails} from '~module/product-details/entity/product-details.entity';
import {ProductFiles} from '~module/product-files/entity/product-files.entity';
import {ProductGroup} from '~module/product-groups/entity/product-group.entity';
import {Order} from '~module/orders/entity/order.entity';

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

	@ManyToOne(() => Partner, {cascade: true})
	@JoinColumn({name: 'creator_id', referencedColumnName: 'id'})
	[PARTNER_KEY]: Partner;

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
}
