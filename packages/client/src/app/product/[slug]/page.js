import React from 'react';
import dynamic from 'next/dynamic';
import BaseBreadcrumb from '../../../components/BaseBreadcrumb';
import BaseDivide from '../../../components/BaseDivide';
import {
	AuthorIcon,
	ClockIcon,
	DownloadIcon,
	LabelIcon,
} from '../../../contants/icon';
import BaseIcon from '../../../components/BaseIcon';
import {getProductDetails, getProductList} from '../../../apis/product';
import BaseCarousel from '../../../components/BaseCarousel';
import BaseCardAuthor from '../../../components/BaseCardAuthor';
import Link from 'next/link';
import Image from 'next/image';
import BuyCard from '../../../components/buy-card';

// eslint-disable-next-line react/prop-types
export default async function Page({params}) {
	// eslint-disable-next-line react/prop-types

	const productDetailsPromise = getProductDetails(params.slug);
	const [productDetails] = await Promise.all([productDetailsPromise]);

	const {
		id,
		title,
		updatedAt,
		description,
		account,
		group_product,
		photoList,
		product_details,
		content,
		slug,
		product_photos_list,
		photo,
	} = productDetails;
	console.log(productDetails);
	const options = [
		{name: 'Trang chủ', path: '/'},
		{name: 'Sản phẩm', path: '/product'},
		{name: title, path: '/' + slug},
	];

	return (
		<div className='w-max-1150  m-auto'>
			<div className='grid grid-cols-6 gap-5 pb-5 '>
				<div className='col-span-4  p-3  rounded-md '>
					<div className='mt-5'>
						<BaseBreadcrumb options={options} />
					</div>
					<div className='text-3xl text-center text-slate-500 font-bold mt-7 mb-2'>
						{title}
					</div>

					<div className='text-center text-sm text-gray-400 pb-4 flex items-center gap-2 justify-center'>
						<BaseIcon width={20} name={'author icon'} icon={AuthorIcon} />
						{account?.fullName} -
						<BaseIcon width={20} name={'clock icon'} icon={ClockIcon} />
						{new Date(updatedAt).toLocaleDateString('vi-VN')}
					</div>
					<div className='text-gray-500'>{description}</div>
					{/* <div className='mt-5'>
						<BaseCarousel
							images={product_photos_list.map((item) => ({
								...item,
								src: 'http://localhost:5000/images/' + item.path,
							}))}
						/>
					</div> */}
					<div className='my-5'>
						<Image
							width={700}
							height={300}
							src={'http://localhost:5000/images/' + photo}
							alt='hd'
						/>
					</div>
					<p className='mb-5  mt-10  font-semibold text-slate-700'>CHI TIẾT</p>
					<div
						className='pt-0 m-auto leading-8 tracking-wide text-slate-600'
						dangerouslySetInnerHTML={{__html: content}}></div>

					<div className='text-center flex gap-3 mt-5'>
						<span className=' flex items-center gap-1 text-gray-600 text-sm  p-1 px-2'>
							<BaseIcon width={20} icon={LabelIcon} />
							nhà cấp 4
						</span>
						<span className=' flex items-center gap-1 text-gray-600 text-sm  p-1 px-2'>
							<BaseIcon width={20} icon={LabelIcon} />
							nhà đẹp
						</span>
						<span className=' flex items-center gap-1 text-gray-600 text-sm  p-1 px-2'>
							<BaseIcon width={20} icon={LabelIcon} />
							bản vẽ
						</span>
					</div>
				</div>

				<div className='col-span-2 mt-5'>
					<div className=''>
						<BuyCard id={id} photo={photo} />
					</div>
					<div className=' w-full mt-5'>
						<BaseCardAuthor />
					</div>
				</div>
			</div>
		</div>
	);
}

// export async function generateStaticParams() {
// 	const params = await getProductList()
// 	console.log("parmas")
// 	return [
// 		{
// 			slug: 'food',
// 		},
// 		{
// 			slug: 'materials',
// 		},
// 	];
// }
