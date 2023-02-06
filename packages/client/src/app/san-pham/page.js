'use client';

import {Button, Divider, Form, Pagination, Segmented, Slider, Tag} from 'antd';
import React from 'react';
import {OneToOneOutlined, FilterOutlined} from '@ant-design/icons';
import BaseCard from '../../components/BaseCard';
import SeachInput from '../../components/SeachInput';

export default function Product() {
	return (
		<>
			<SeachInput/>
			
			<Divider />
			<div className='grid grid-cols-5 gap-4 my-5'>
				<div className='col-span-1'>
					<div className='flex items-center text-sm gap-2 mb-4'>
						<FilterOutlined />
						Bộ lọc
					</div>
					<Form layout='vertical'>
						<Form.Item label='Chiều dài' className='mb-0'>
							<Slider min={1} max={20} />
						</Form.Item>
						<Form.Item label='Chiều rộng'>
							<Slider min={1} max={20} className='mb-0' />
						</Form.Item>
						<Form.Item label='Số tầng'>
							<Slider min={1} max={20} className='mb-0' />
						</Form.Item>
						<Form.Item label='Số phòng ngủ'>
							<Slider min={1} max={20} className='mb-0' />
						</Form.Item>
						<Button className='w-full'>Lọc</Button>
					</Form>
				</div>
				<div className='pl-7 col-span-4'>
					<section className='flex justify-between mb-4 items-center gap-3'>
						<Tag color='processing'>180 sản phẩm</Tag>
						<div className='text-sm flex'>
							<div className='flex items-center gap-2'>
								<OneToOneOutlined />
								Sắp xếp :
							</div>
							<Segmented
								options={['Mới nhất', 'Giá tăng', 'Giá giảm', 'Cũ nhất', 'Yêu thích']}
							/>
						</div>
					</section>
					<Divider />
					<section className='grid grid-cols-3 gap-10'>
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
						<BaseCard />
					</section>
					<Pagination
					simple
						className='my-5 text-center'
						defaultCurrent={1}
						total={500}
						showQuickJumper
					/>
				</div>
			</div>
			<p className='my-5'>TỪ KHÓA</p>
			<section className='grid grid-cols-4 p-4 bg-white rounded-md'>
				<ul className='flex flex-col gap-2'>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
				</ul>
				<ul className='flex flex-col gap-2'>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
				</ul>
				<ul className='flex flex-col gap-2'>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
				</ul>
				<ul className='flex flex-col gap-2'>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
					<li>
						<a href='#a' className='underline'>
							Mẫu nhà cấp 4 đẹp ...
						</a>
					</li>
				</ul>
			</section>
		</>
	);
}
