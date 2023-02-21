import React from 'react';

import BaseCard from '../../components/BaseCard';
import BaseDivide from '../../components/BaseDivide';
import BasePagination from '../../components/BasePagination';
import BaseRange from '../../components/BaseRange';
import Keyword from '../../components/Keyword';
import PropTypes from 'prop-types';
import {getProductList} from '../../apis/product';
import BaseSearchSub from "../../components/BaseSearchSub"


export default async function Product({params, searchParams}) {

	const newSearchParams = {
		currentPage: 1,
		perPage: 2,
		...searchParams,
	};


	const productListPromise = getProductList(newSearchParams);
	const [productList] = await Promise.all([productListPromise]);

	const ListProduct = ({list}) => {
		return list.data.map((item) => <BaseCard data={item} key={item.id} />);
	};
	
	return (
		<>
			{/* <SeachInput /> */}

			<div className='grid grid-cols-5 gap-4 my-5 w-max-1250 m-auto h-52 bg-blue-500 rounded'></div>
			<div className='grid grid-cols-5 gap-4 my-5 w-max-1250 m-auto'>
				<div className='col-span-1'>
					<BaseSearchSub/>
					<BaseDivide />
					<div className='flex items-center text-sm gap-2 mb-4'>Bộ lọc</div>
					<BaseRange label='Chiều dài' min={10} max={100} unit={'m'} />
					<BaseRange label='Chiều rộng' min={4} max={100} unit={'m'} />
					<BaseRange label='Diện tích' min={50} max={500} unit={'m2'} />
					<BaseRange label='Phòng ngủ' min={1} max={5} unit={'phòng'} />
					<BaseRange label='Số tầng' min={0} max={20} unit={'tầng'} />
					<button className='p-2 bg-slate-300 w-full rounded mt-2 '>Lọc</button>
				</div>
				<div className='pl-7 col-span-4'>
					<section className='flex justify-between mb-4 items-center gap-3'>
						{/* <Tag color='processing'>180 sản phẩm</Tag> */}

						<div className='flex gap-4 text-sm'>
							<div className='flex items-center gap-2'>Sắp xếp :</div>
							<button className='focus:text-rose-500 hover:text-rose-500'>
								Mới nhất
							</button>
							<button className='focus:text-rose-500 hover:text-rose-500'>
								Cũ nhất
							</button>
							<button className='focus:text-rose-500 hover:text-rose-500'>
								Giá tăng
							</button>
							<button className='focus:text-rose-500 hover:text-rose-500'>
								Giá giảm
							</button>
							<button className='focus:text-rose-500 hover:text-rose-500'>
								Yêu thích
							</button>
						</div>
						<div className='ml-2 border px-2 border-sky-200 bg-sky-100 rounded text-sm'>
							180 sản phẩm
						</div>
					</section>
					<BaseDivide />
					<section className='grid grid-cols-3 gap-10 mb-2'>
						<ListProduct list={productList} />
					</section>
					<div className='flex justify-end mt-4'>
						<BasePagination link={'/san-pham'} search={newSearchParams} />
					</div>
				</div>
			</div>
			<section className='w-max-1250 m-auto'>
				<Keyword />
			</section>
		</>
	);
}
Product.propTypes = {
	params: PropTypes.object,
	searchParams: PropTypes.object,
};
