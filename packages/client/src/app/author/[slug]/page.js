import React from 'react'
import PropTypes from 'prop-types'
import Image from "next/image"
import BaseSection from "../../../components/BaseSection"
import BaseDivide from '../../../components/BaseDivide';
import { getNewsList } from '../../../apis/news';
import BaseNewsCard from '../../../components/BaseNewsCard';

async function page(props) {
	const newSearchParams = {
		currentPage: 1,
		perPage: 8,
		// ...searchParams,
	};

	const newsListPromise = getNewsList(newSearchParams);
	const [newsList] = await Promise.all([newsListPromise]);
	const ListNews = ({list}) => {
		return list.data.map((item) => <BaseNewsCard data={item} key={item.id} />);
	};
  return (
			<div className='w-max-1150 m-auto mt-10'>
				<div className='flex gap-10 items-center mb-4 '>
					<Image
						className='rounded-full w-44 h-44 object-cover shadow-md '
						width={200}
						height={100}
						src={
							'https://media.bizwebmedia.net/sites/61272/data/Upload/2015/1/ky_thuat_chup_anh_chan_dung__1(1).jpg'
						}
					/>
					<div className=''>
						<ul className='text-lg font-semibold text-gray-600  flex flex-col gap-2'>
							<li> PHAN TIN TUONG</li>
							<li> 10/08/1995</li>
							<li> 082347987234</li>
							<li> tintuong95@gmail.com</li>
							<li> Thanh Pho ho chi minh</li>
						</ul>
					</div>
				</div>
				<BaseDivide />
				<div>
					<BaseSection />
				</div>
				<BaseDivide />
				<h1 className='text-xl font-semibold text-gray-600 mb-6'>BLOGS</h1>
				<section className=' grid grid-cols-4 gap-4 mr-5'>
					<ListNews list={newsList} />
				</section>
			</div>
		);
}

page.propTypes = {}

export default page
