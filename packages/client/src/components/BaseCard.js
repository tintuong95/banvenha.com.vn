'use client';
import React from 'react';
import {useRouter} from 'next/navigation';
import BaseIcon from './BaseIcon';
import {
	AuthorIcon,
	BookMarkIcon,
	FavoriteIcon,
	HeartPlusIcon,
	SellIcon,
} from '../contants/icon';
import PropTypes from 'prop-types';
import Image from 'next/image';
import BaseImage from './BaseImage';


export default function BaseCard({data}) {
	const router = useRouter();
	function onRouterLink() {
		router.push('/san-pham/' + param);
	}
	function onAction(e) {
		e.stopPropagation();
	}

	function onBuyProduct(e) {
		e.stopPropagation();
		router.push('/thanh-toan');
	}
	const {id,name,param,price,sale,likes,admin,image}=data
	return (
		<div
			onClick={onRouterLink}
			aria-hidden='true'
			className='flex flex-col border cursor-pointer border-slate-300 shadow-md bg-white rounded overflow-hidden transform transition duration-500 hover:scale-105'>
			<BaseImage image={image} name={name} />
			<div className='font-semibold  text-gray-800 m-3 '>{name}</div>
			<div className=' mx-2 text-sm text-gray-400 flex items-center gap-2'>
				<BaseIcon name={'author icon'} icon={AuthorIcon} />
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
			<div className='mt-2 w-full grid grid-cols-5 p-2 gap-2'>
				<div className='col-span-2 flex gap-2 '>
					<button className='flex items-center gap-2' onClick={onAction}>
						<BaseIcon icon={HeartPlusIcon} name={'heart plus icon'} /> 1000
					</button>
					{/* <button onClick={onAction}>
						<BaseIcon icon={BookMarkIcon} name={'bookmark icon'} />
					</button> */}
				</div>
				{/* <div
					onClick={onBuyProduct}
					aria-hidden='true'
					className='col-span-3 border border-gay-200 font-semibold text-center p-1 bg-gay-300 shadow-inner shadow-gay-300  rounded '>
					-10%
				</div> */}
			
				<div
					onClick={onBuyProduct}
					aria-hidden='true'
					className='col-span-3 border border-rose-600 font-semibold text-center p-1 bg-rose-500 shadow-inner shadow-rose-400 text-white rounded '>
					{price} đ
				</div>
			</div>
		</div>
	);
}
BaseCard.propTypes = {
	data: PropTypes.object,
};