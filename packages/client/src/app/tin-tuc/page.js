import React from 'react';
import {getNewsList} from '../../apis/news';
import BaseNewsCard from '../../components/BaseNewsCard';
import BasePagination from '../../components/BasePagination';

export default async function Posts({params, searchParams}) {
	const newSearchParams = {
		currentPage: 1,
		perPage: 1,
		...searchParams,
	};

	const newsListPromise = getNewsList(newSearchParams);
	const [newsList] = await Promise.all([newsListPromise]);

	const ListNews = ({list}) => {
		return list.data.map((item) => <BaseNewsCard data={item} key={item.id} />);
	};
	return (
		<div className='grid grid-cols-5 w-max-1250 m-auto'>
			<div className='col-span-4 mb-5 mr-5'>
				<div className='my-5'>MỚI NHẤT</div>
				<section className=' grid grid-cols-4 gap-4 mr-5'>
					<ListNews list={newsList} />
				</section>
				<div className='my-5'>
					<BasePagination link={'/tin-tuc'} search={newSearchParams} />
				</div>
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
