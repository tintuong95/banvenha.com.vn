import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn,
	OneToOne,
	BeforeInsert,
	OneToMany,
	PrimaryColumn,
	BeforeUpdate,
	PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseEntity} from '~shared/base.entity';
import {ApiProperty} from '@nestjs/swagger';
import {PRODUCT_STATUS} from '../type/product.type';
import {
	ORDER_RELATION,
	PRODUCT_RELATION,
	PRODUCT_GROUP_RELATION,
	PRODUCT_TAG_RE_RELATION,
	PRODUCT_PHOTO_LIST_RELATION,
	ACCOUNT_RELATION,
} from '~contants/relation';
import {Order} from '~module/orders/entity/order.entity';
import {Exclude} from 'class-transformer';
import {generateId} from '~util/generate';
import createSlug from '~util/createSlug';
import {ProductGroup} from '~module/productGroup/entity/productGroup.entity';
import {ProductTagRelation} from '~module/productTagRelation/entity/productTagRelation.entity';
import {ProductPhotoList} from '~module/productPhotoList/entity/productPhotoList.entity';
import {Account} from '~module/account/entity/account.entity';

@Entity({name: 'products'})
export class Product extends BaseEntity {
	@PrimaryColumn()
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
		type: 'text',
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
		length: 500,
		nullable: false,
	})
	@ApiProperty()
	file: string;

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

	@Column('text')
	@ApiProperty()
	photoList: string;

	@BeforeInsert()
	setId() {
		this.id = generateId('BL');
	}

	@BeforeInsert()
	createSlug() {
		this.slug = createSlug(this.title);
	}

	@BeforeUpdate()
	updateSlug() {
		this.slug = createSlug(this.title);
	}

	@ManyToOne(() => ProductGroup, {cascade: true})
	@JoinColumn({name: 'groupId'})
	[PRODUCT_GROUP_RELATION]: ProductGroup;

	@OneToMany(
		() => ProductTagRelation,
		(productTagRelation) => productTagRelation[PRODUCT_RELATION]
	)
	[PRODUCT_TAG_RE_RELATION]: ProductTagRelation;

	@OneToMany(
		() => ProductPhotoList,
		(productPhotoList) => productPhotoList[PRODUCT_RELATION]
	)
	[PRODUCT_PHOTO_LIST_RELATION]: ProductPhotoList;

	@ManyToOne(() => Account, {cascade: true})
	@JoinColumn({name: 'creatorId', referencedColumnName: 'id'})
	[ACCOUNT_RELATION]: Account;

	@OneToOne(() => Order, (order) => order[PRODUCT_RELATION])
	[ORDER_RELATION]: Order;
}
