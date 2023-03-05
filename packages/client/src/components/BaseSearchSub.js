'use client';
import Link from 'next/link';
import React, {useState} from 'react';

export default function BaseSearchSub() {
	const [search, setSearch] = useState('');
	return (
		<>
			<div className='flex items-center text-sm gap-2 mb-4'>Tìm kiếm</div>
			<input
				onChange={(e) => {
					setSearch(e.target.value);
				}}
				className='w-full p-2 border rounded text-sm'
				placeholder='Tên bản vẽ'
			/>
			<Link href={{pathname: 'product', query: {name: search}}}>
				<button className='p-2 bg-rose-600 hover:bg-rose-500  text-white w-full rounded mt-2 '>
					Tìm kiếm
				</button>
			</Link>
		</>
	);
}
