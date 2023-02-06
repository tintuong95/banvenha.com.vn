'use client'

import {  Pagination } from 'antd';

import React from 'react'
import BaseNewsCard from '../../components/BaseNewsCard';

export default function Posts() {
  return (
			<div className='grid grid-cols-5'>
				<div className='col-span-4 mb-5 mr-5'>
					<div className='my-5'>MỚI NHẤT</div>
					<section className=' grid grid-cols-4 gap-4 mr-5'>
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
						<BaseNewsCard />
					</section>
					<Pagination
						simple
						className='my-10 text-center'
						showQuickJumper
						defaultCurrent={2}
						total={500}
					/>
				</div>
				<div className='col-span-1'>
					<div className='my-5'>GỢI Ý</div>
					<ul className='flex flex-col list-disc gap-3'>
						<li href='h' className='text-sm'>
							Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
						</li>
						<li href='h' className='text-sm'>
							Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
						</li>
						<li href='h' className='text-sm'>
							Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
						</li>
						<li href='h' className='text-sm'>
							Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
						</li>
						<li href='h' className='text-sm'>
							Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
						</li>
					</ul>
				</div>
			</div>
		);
}
