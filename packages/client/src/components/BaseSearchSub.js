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
				className='w-full p-2 border rounded '
				placeholder='Tên bản vẽ'
			/>
			<Link href={{pathname: 'san-pham', query: {name: search}}}>
				<button className='p-2 bg-sky-600  text-white w-full rounded mt-2 '>
					Tìm kiếm
				</button>
			</Link>
		</>
	);
}
