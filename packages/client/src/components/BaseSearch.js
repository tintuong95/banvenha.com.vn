'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function BaseSearch() {
    const [search,setSearch]=useState("")
    
	return (
		<div className='flex gap-2'>
			<input
				onChange={(e) => {
					setSearch(e.target.value);
				}}
				className='w-96 h-10 rounded-md border shadow p-4 outline-none focus:shadow-xl'
				placeholder='Nhập tên bản vẽ bạn cần tìm '
			/>
			<Link href={{pathname:"san-pham",query:{name:search}}}>
				<button className='h-10 shadow bg-rose-500 hover:bg-rose-600 px-3 rounded-md text-white'>
					Tìm kiếm
				</button>
			</Link>
		</div>
	);
}

BaseSearch.propTypes = {};

export default BaseSearch;
