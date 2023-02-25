import React from 'react';
import dynamic from 'next/dynamic';
import BaseBreadcrumb from '../../../components/BaseBreadcrumb';
import BaseDivide from '../../../components/BaseDivide';
import {AuthorIcon, ClockIcon, DownloadIcon, LabelIcon} from '../../../contants/icon';
import BaseIcon from '../../../components/BaseIcon';
import {getProductDetails, getProductList} from '../../../apis/product';
import BaseCarousel from '../../../components/BaseCarousel';
import BaseCardAuthor from '../../../components/BaseCardAuthor';
import Link from 'next/link';

// eslint-disable-next-line react/prop-types
export default async function Page({params}) {
	// eslint-disable-next-line react/prop-types

	const productDetailsPromise = getProductDetails(params.slug);
	const [productDetails] = await Promise.all([productDetailsPromise]);

	const {
		id,
		name,
		updated_at,
		description,
		admin,
		group_product,
		images,
		product_details,
		content,
		param,
	} = productDetails;
	const options = [
		{name: 'Trang chủ', path: '/'},
		{name: 'Tin Tức', path: '/tin-tuc'},
		{name: name, path: '/' + param},
	];

	return (
		<div className='w-max-1250 m-auto'>
			<div className='grid grid-cols-7 gap-5 pb-5 '>
				<div className='col-span-4  p-3  rounded-md '>
					<div className='mt-5'>
						<BaseBreadcrumb options={options} />
					</div>
					<div className='text-3xl text-center text-slate-500 font-bold mt-7 mb-2'>
						{name}
					</div>

					<div className='text-center text-sm text-gray-400 pb-4 flex items-center gap-2 justify-center'>
						<BaseIcon width={20} name={'author icon'} icon={AuthorIcon} />
						{admin.name} -
						<BaseIcon width={20} name={'clock icon'} icon={ClockIcon} />
						{new Date(updated_at).toLocaleDateString('vi-VN')}
					</div>
					<div className='text-gray-500'>{description}</div>
					<div className='mt-5'>
						<BaseCarousel />
					</div>
					<div className=''>
						<div className='relative overflow-x-auto'>
							<p className='mb-5 font-semibold text-slate-700'>THÔNG SỐ KỸ THUẬT</p>
							<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
								<tbody>
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
										<td className='px-6 py-4'>Chiều rộng</td>
										<td className='px-6 py-4'>{product_details?.width | 0} (m)</td>
										<td className='px-6 py-4'>Chiều dài</td>
										<td className='px-6 py-4'>{product_details?.long | 0} (m)</td>
									</tr>
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
										<td className='px-6 py-4'>Diện tích</td>
										<td className='px-6 py-4'>{product_details?.area | 0} (m2)</td>
										<td className='px-6 py-4'>Số tầng</td>
										<td className='px-6 py-4'>{product_details?.floor | 0} (tầng)</td>
									</tr>
									<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
										<td className='px-6 py-4'>Số phòng ngủ</td>
										<td className='px-6 py-4'>{product_details?.bedroom | 0} phòng</td>
										<td className='px-6 py-4'>Thể loại</td>
										<td className='px-6 py-4'>{group_product?.name}</td>
									</tr>
								</tbody>
							</table>
						</div>
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

				<div className='col-span-2 mt-10'>
					<div className='w-5/6'>
						<div className='bg-white rounded-md p-4 shadow-lg'>
							<ul className='mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400'>
								<li className='flex items-center space-x-3'>
									<svg
										className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'></path>
									</svg>
									<span>Individual configuration</span>
								</li>
								<li className='flex items-center space-x-3'>
									<svg
										className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'></path>
									</svg>
									<span>No setup, or hidden fees</span>
								</li>
								<li className='flex items-center space-x-3'>
									<svg
										className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'></path>
									</svg>
									<span>
										Team size:{' '}
										<span className='font-semibold text-gray-900 dark:text-white'>
											1 developer
										</span>
									</span>
								</li>
								<li className='flex items-center space-x-3'>
									<svg
										className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'></path>
									</svg>
									<span>
										Premium support:{' '}
										<span className='font-semibold text-gray-900 dark:text-white'>
											6 months
										</span>
									</span>
								</li>
								<li className='flex items-center space-x-3'>
									<svg
										className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'></path>
									</svg>
									<span>
										Free updates:{' '}
										<span className='font-semibold text-gray-900 dark:text-white'>
											6 months
										</span>
									</span>
								</li>
							</ul>

							<Link
								href={{
									pathname: 'thanh-toan',
									query: {id},
								}}
								className='bg-green-500 hover:bg-green-400 transition   duration-300 ease-in-out   group text-white p-2 w-full rounded-md shadow-md mt-3 flex items-center gap-2 justify-center'>
								{/* <DownloadOutlined /> */}
								<BaseIcon
									className={'group-hover:animate-bounce'}
									width={24}
									icon={DownloadIcon}
								/>
								DOWNLOAD
							</Link>
						</div>
					</div>
					<div className=' w-full'>
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
