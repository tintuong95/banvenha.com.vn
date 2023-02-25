'use client';
import React from 'react';
import {useRouter} from 'next/navigation';
import BaseIcon from './BaseIcon';
import {AuthorIcon, HeartPlusIcon, VerifiedIcon} from '../contants/icon';
import PropTypes from 'prop-types';
import BaseImage from './BaseImage';

export default function BaseCard({data}) {
	const router = useRouter();
	function onRouterLink() {
		router.push('/san-pham/' + param);
	}
	function onAction(e) {
		e.stopPropagation();
	}

	// function onBuyProduct(e) {
	// 	e.stopPropagation();
	// 	router.push('/thanh-toan');
	// }
	const { name, param, price ,admin, image} = data;
	return (
		<div
			onClick={onRouterLink}
			aria-hidden='true'
			className='flex flex-col border cursor-pointer   shadow-lg bg-white rounded-xl overflow-hidden transform transition duration-500 hover:scale-105'>
			<div className='relative'>
				<BaseImage image={image} name={name} />
				<BaseIcon
					className={'absolute top-3 left-3'}
					width={20}
					icon={VerifiedIcon}
					name={'blue icon'}
				/>
				<div className='absolute top-3 right-3 bg-rose-500 px-1 rounded  text-sm text-white'>
					-10%
				</div>
			</div>
			<div className='font-semibold  text-gray-600 px-4 pt-3 flex '>{name}</div>
			<div className=' mx-2 text-sm text-gray-400 px-4 flex justify-end items-center gap-2'>
				<BaseIcon width={20} name={'author icon'} icon={AuthorIcon} />
				{admin.name}
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
			<div className='mt-2 w-full grid grid-cols-5 px-4 py-2 gap-2'>
				<div className='col-span-1 flex gap-2 '>
					<button className='flex items-center gap-2 text-sm' onClick={onAction}>
						<BaseIcon width={20} icon={HeartPlusIcon} name={'heart plus icon'} /> 1000
					</button>
				</div>

				<div
					// onClick={onBuyProduct}
					aria-hidden='true'
					className='col-span-4 font-semibold text-end p-1   text-rose-800 rounded '>
					<small className='line-through text-gray-400 text-xs mr-1 font-light'>100.000</small>
					{price.toLocaleString('vi-VN')} VND
				</div>
			</div>
		</div>
	);
}
BaseCard.propTypes = {
	data: PropTypes.object,
};
