'use client';
import React from 'react';
import {useRouter} from 'next/navigation';
import BaseIcon from './BaseIcon';
import {AuthorIcon, HeartPlusIcon, VerifiedIcon} from '../contants/icon';
import PropTypes from 'prop-types';
import BaseImage from './BaseImage';
import Link from 'next/link';

export default function BaseCard({data}) {
	// const router = useRouter();
		const {title, slug, price, account, photo,likes,sale} = data;
	// function onRouterLink() {
	// 	router.push('/product/' + slug);
	// }
	// function onAction(e) {
	// 	e.stopPropagation();
	// }

	// function onBuyProduct(e) {
	// 	e.stopPropagation();
	// 	router.push('/payment');
	// }
	const totalPrice =(price,sale)=>{

		return Math.round(+price -+ price * sale/100);
	}

	return (
		<Link
			href={'/product/' + slug}
			// onClick={onRouterLink}
			aria-hidden='true'
			className='flex flex-col border cursor-pointer   shadow-lg bg-white rounded-md overflow-hidden transform transition duration-500 hover:scale-105'>
			<div className='relative'>
				<BaseImage image={photo} name={title} />
				<BaseIcon
					className={'absolute top-3 left-3'}
					width={20}
					icon={VerifiedIcon}
					name={'blue icon'}
				/>
				{sale !== 0 && (
					<div className='absolute top-3 right-3 bg-rose-500 px-1 rounded  text-sm text-white'>
						{sale}%
					</div>
				)}
			</div>
			<div className='font-semibold  text-gray-600 px-4 pt-3  line-2 mb-2'>
				{title}
			</div>
			<div className=' mx-2 text-sm hover:text-rose-500 text-gray-400 px-4 flex justify-end items-center gap-2'>
				<BaseIcon
					name={'author icon'}
					icon={
						'https://i.pinimg.com/736x/fb/6c/cb/fb6ccbd88bd0ac4e2585dc3fc716c221--places-to-visit.jpg'
					}
					className={'rounded-full h-6 w-6  object-cover shadow-md'}
				/>
				<Link href={'author/' + data.account.id}>{account.fullName}</Link>
			</div>

			{/* <div className='flex '>
				<div className=' mx-2 text-sm text-sky-600 flex items-center gap-2'>
					<BaseIcon name={'sell icon'} icon={SellIcon} />
					1.000
				</div>
				<div className=' mx-2 text-sm text-rose-400 flex items-center gap-2'>
					<BaseIcon name={'heart icon'} icon={FavoriteIcon} />
					{likes}
				</div>
			</div> */}
			<div className=' w-full grid grid-cols-5 px-4 py-2 gap-2'>
				<div className='col-span-1 flex gap-2 '>
					<button className='flex items-center gap-2 text-sm'>
						<BaseIcon width={20} icon={HeartPlusIcon} name={'heart plus icon'} />
						{likes}
					</button>
				</div>

				<div
					// onClick={onBuyProduct}
					aria-hidden='true'
					className='col-span-4 font-semibold text-end p-1   text-rose-800 rounded '>
					{sale !== 0 && (
						<small className='line-through text-gray-400 text-xs mr-1 font-light'>
							{price.toLocaleString('vi-VN')}
						</small>
					)}
					{totalPrice(price, sale).toLocaleString('vi-VN')} VND
				</div>
			</div>
		</Link>
	);
}
BaseCard.propTypes = {
	data: PropTypes.object,
};
