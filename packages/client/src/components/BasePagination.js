'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import PropTypes from 'prop-types';

function BasePagination({link, search}) {
	const router = useRouter();
	// const [page, setPage] = useState();

	const handleLink = (newPage) => {
		search.currentPage = newPage;
		const newLink = link + '?' + new URLSearchParams(search);
		router.push(newLink);
	};

	// const inputChangePage = (e) => {
	// 	setPage(e.target.value);
	// };

	// useEffect(() => {
	// 	setPage(search.currentPage);
	// }, [search.currentPage]);

	// useEffect(() => {
	// 	handleLink(page);
	// }, [page]);
	return (
		<div className='flex flex-col items-center'>
			<div className='inline-flex  gap-1 mt-2 xs:mt-0'>
				<button
					onClick={() => {
						handleLink(--search.currentPage);
					}}
					className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:bg-slate-100  rounded  bg-slate-200'>
					<svg
						aria-hidden='true'
						className='w-5 h-5 mr-2'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
							clipRule='evenodd'></path>
					</svg>
					Prev
				</button>
				<div className='flex items-center gap-1'>
					<input
						className='inline-flex items-center w-10 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-slate-100  rounded  bg-slate-200 '
						// value={page}
						// onChange={inputChangePage}
					/>
					|
					<input
						readOnly
						className='inline-flex items-center w-16 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-slate-100  rounded  bg-slate-200 '
						value={100}
					/>
				</div>
				<button
					onClick={() => {
						handleLink(++search.currentPage);
					}}
					className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:bg-slate-100  rounded  bg-slate-200'>
					Next
					<svg
						aria-hidden='true'
						className='w-5 h-5 ml-2'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
							clipRule='evenodd'></path>
					</svg>
				</button>
			</div>
		</div>
	);
}

BasePagination.propTypes = {
	link: PropTypes.string,
	search: PropTypes.object,
};

export default BasePagination;
