'use client'
import { Avatar, Button, Table, Tag } from 'antd';
import React from 'react'
import BasePagination from '../../components/BasePagination';
const columns = [
	{
		title: 'Hình',
		dataIndex: 'image',
		key: 'image',
		render: () => (
			<Avatar
				shape='square'
				size={64}
				src={<img src={'https://picsum.photos/200/300'} alt='avatar' />}
			/>
		),
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => (
			<div>
				<div className='flex items-center'>A001 - Phan Tự Tin</div>
				<div>{text}</div>
			</div>
		),
	},

	{
		title: 'Email nhận',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Giá',
		key: 'price',
		dataIndex: 'price',
		render: () => <Tag color='red'>500.000 đ</Tag>,
	},
	{
		title: 'Thời gian',
		key: 'updated_at',
		dataIndex: 'updated_at',
	},
	{
		title: 'Thao tác',
		render: () => <Button>Gửi lại</Button>,
	},
];
const data = [
	{
		key: '1',
		name: 'Bản vẽ nhà cấp 4 4x15',
		partner: 'John Brown',
		email: 'admin@gmail.com',
		updated_at: '10:10 10/12/2022',
	},
	{
		key: '2',
		name: 'Bản vẽ nhà cấp 4 4x15',
		partner: 'John Brown',
		email: 'admin@gmail.com',
		updated_at: '10:10 10/12/2022',
	},
	{
		key: '3',
		name: 'Bản vẽ nhà cấp 4 4x15',
		partner: 'John Brown',
		email: 'admin@gmail.com',
		updated_at: '10:10 10/12/2022',
	},
	{
		key: '4',
		name: 'Bản vẽ nhà cấp 4 4x15',
		partner: 'John Brown',
		email: 'admin@gmail.com',
		updated_at: '10:10 10/12/2022',
	},
	{
		key: '5',
		name: 'Bản vẽ nhà cấp 4 4x15',
		partner: 'John Brown',
		email: 'admin@gmail.com',
		updated_at: '10:10 10/12/2022',
	},
];
export default function page() {
  return (
			<div className='w-max-1250 m-auto'>
				<div className='my-5'>Lịch sử mua</div>
				<Table pagination={false} columns={columns} dataSource={data} />
				<div className='my-5'></div>
				<BasePagination />
			</div>
		);
}
