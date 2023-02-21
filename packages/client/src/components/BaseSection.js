import React from 'react';
import BaseCard from './BaseCard';
import PropTypes from 'prop-types';
import {getProductList} from '../apis/product';

export default async function BaseSection({groupId,name}) {
	const params = {};
	params.group_id = 5;
	params.perPage = 8;
	params.currentPage = 1;

	const productListPromise = getProductList(params);
	const [productList] = await Promise.all([productListPromise]);

	const ListProduct = ({list}) => {
		return list.data.map((item) => <BaseCard data={item} key={item.id} />);
	};
	return (
		<>
			<div className='mt-10 flex gap-2 justify-between mb-5'>
				<div className='text-slate-700 font-semibold'>{name.toUpperCase()}</div>
				<div className='ml-2 border px-2 border-sky-200 bg-sky-100 rounded text-sm'>
					{productList.meta.total} sản phẩm
				</div>
			</div>

			<section className='grid grid-cols-4 gap-10'>
				<ListProduct list={productList} />
			</section>
		</>
	);
}

BaseSection.propTypes = {
	groupId: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};
