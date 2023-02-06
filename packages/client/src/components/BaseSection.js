import { Divider, Tag } from 'antd';
import React from 'react'
import BaseCard from './BaseCard';

export default function BaseSection() {
  return (
			<>
				<div className='mt-5'>
					MỚI NHẤT
					<Tag className='ml-2' color='processing'>
						180 sản phẩm
					</Tag>
				</div>
				<Divider />
				<section className='grid grid-cols-4 gap-10'>
					<BaseCard />
					<BaseCard />
					<BaseCard />
					<BaseCard />
					<BaseCard />
					<BaseCard />
					<BaseCard />
					<BaseCard />
				</section>
			</>
		);
}
