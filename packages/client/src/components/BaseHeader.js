'use client';

import { Button, Dropdown } from 'antd';
import React from 'react';
import {
	UserOutlined,
	MailOutlined,
	PhoneOutlined,
	DownOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
const items = [
	{
		key: '1',

		label: 'Nhà cấp 4',
	},
	{
		key: '2',

		label: 'Nhà phố',
	},
	{
		key: '4',

		label: 'Biệt thự',
	},
	{
		key: '3',

		label: 'Nhà vườn',
	},
];
const items1 = [
	{
		key: '1',

		label: 'Lịch sử',
	},
	{
		key: '2',

		label: 'Sưu tầm',
	},
	{
		key: '4',
danger:true,
		label: 'Đăng xuất',
	},
	
];
export default function BaseHeader() {
	return (
		<>
			<div className='w-max-1250 m-auto flex justify-end gap-3 my-1'>
				<span className='text-sm flex items-center gap-1 text-slate-500'>
					<MailOutlined />
					admin@banvenha.com.vn
				</span>
				<span className='text-sm flex items-center gap-1 text-slate-500'>
					<PhoneOutlined />
					0977.777.77
				</span>
			</div>
			<div className='w-screen bg-gradient-to-r from-rose-500  to-gray-700'>
				<nav className='py-6 w-max-1250 m-auto'>
					<div className='container flex flex-wrap items-center justify-between mx-auto'>
						<Link href={{pathname: '/'}}>
							<p href='#a' className='text-white text-xl font-semibold m-0'>
								BANVENHA.COM.VN
							</p>
						</Link>

						<div className='flex'>
							<Link href={{pathname: '/'}}>
								<Button type='text' className='text-white   ' size='middle'>
									TRANG CHỦ
								</Button>
							</Link>
							<Dropdown
								menu={{
									items,
								}}>
								<Link href={{pathname: '/san-pham'}}>
									<Button
										type='text'
										className='text-white flex items-center'
										size='middle'>
										SẢN PHẨM <DownOutlined />
									</Button>
								</Link>
							</Dropdown>
							<Link href={{pathname: '/tin-tuc'}}>
								<Button type='text' className='text-white ' size='middle'>
									TIN TỨC
								</Button>
							</Link>
							<Button type='text' className='text-white ' size='middle'>
								ĐỐI TÁC
							</Button>
							<Button type='text' className='text-white ' size='middle'>
								THÔNG TIN
							</Button>

							<Dropdown
								menu={{
									items: items1,
								}}>
								<Button
									type='primary'
									className='text-white bg-rose-400 shadow-md  flex items-center'
									size='middle'>
									<UserOutlined />
									HOÀNG
								</Button>
							</Dropdown>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}
