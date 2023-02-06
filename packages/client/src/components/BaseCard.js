'use client';
import React from 'react';
import {
	UserOutlined,
	ShoppingCartOutlined,
	AppstoreAddOutlined,
	HeartOutlined,
} from '@ant-design/icons';
import {Button} from 'antd';
import {useRouter} from 'next/navigation';


export default function BaseCard() {
	const router = useRouter();
	function onRouterLink() {
		router.push('/san-pham/d');
	}
	function onAction(e) {
		e.stopPropagation();
	}

	function onBuyProduct(e) {
		e.stopPropagation();
		router.push('/thanh-toan');
	}
	return (
		<div
			onClick={onRouterLink}
			aria-hidden='true'
			className='flex flex-col border cursor-pointer border-slate-300 shadow-md bg-white rounded overflow-hidden transform transition duration-500 hover:scale-105'>
			<img
				className=''
				src='https://picsum.photos/200/140'
				alt='imag'
				
			/>
			<div className='font-semibold  text-gray-800 m-3 '>
				Bản vẽ nhà cấp 4 5x20 2 phòng ngủ 1 tầng diện tích 100m2
			</div>
			<div className=' mx-2 text-sm text-gray-400 flex items-center gap-2'>
				<UserOutlined />
				Phan Tự Tin
			</div>
			<div className='flex '>
				<div className=' mx-2 text-sm text-sky-600 flex items-center gap-2'>
					<ShoppingCartOutlined />
					1.000
				</div>
				<div className=' mx-2 text-sm text-rose-400 flex items-center gap-2'>
					<HeartOutlined />
					1.000
				</div>
			</div>
			<div className='mt-2 w-full grid grid-cols-5 p-2'>
				<div className='col-span-2 flex gap-2 '>
					<Button
						onClick={onAction}
						danger
						type='dashed'
						shape='circle'
						icon={<HeartOutlined />}
					/>
					<Button
						onClick={onAction}
						type='dashed'
						shape='circle'
						icon={<AppstoreAddOutlined />}
					/>
				</div>
				<div
					onClick={onBuyProduct}
					aria-hidden='true'
					className='col-span-3 border-2 border-rose-400  text-rose-500 font-semibold text-center p-1 '>
					500.000 đ
				</div>
			</div>
		</div>
	);
}
