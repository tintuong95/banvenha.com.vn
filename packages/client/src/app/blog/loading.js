'use client';

import {Skeleton} from 'antd';

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className='w-max-1250 m-auto grid grid-cols-4 gap-4 p-10'>
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
			<Skeleton className='mt-5' active />
		</div>
	);
}
