'use client'
import React from 'react';
import {
	UserOutlined,

} from '@ant-design/icons';
export default function BaseNewsCard() {
	return (
		<div className='flex flex-col'>
			<img className='rounded-md' alt='me' src='https://picsum.photos/200/130' />
			<div className='font-semibold  text-gray-800 m-3 mb-1'>
				Top 10 mẫu nhà đẹp nhất 2022{' '}
			</div>
			<div className=' mx-2 text-sm text-gray-400 flex items-center gap-2'>
				<UserOutlined />
				Phan Tự Tin
			</div>
		</div>
	);
}
