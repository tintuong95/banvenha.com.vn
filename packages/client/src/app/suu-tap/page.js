'use client'

import React from 'react'
import {Avatar, Button, Pagination, Table, Tag} from 'antd';
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
		render: (text) => <div>{text}</div>,
	},

	{
		title: 'Tác giả',
		dataIndex: 'partner',
		key: 'partner',
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
		render: () => (
			<div className='flex gap-2'>
				<Button>Mua ngay</Button>
				<Button danger>Xóa</Button>
			</div>
		),
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
export default function Collection() {
  return (
			<>
				<div className='my-5'>Bộ sưu tập</div>
				<Table pagination={false} columns={columns} dataSource={data} />
				<div className='my-5'></div>
				<Pagination
					className='text-center'
					simple
					showQuickJumper
					defaultCurrent={2}
					total={500}
				/>
			</>
		);
}
