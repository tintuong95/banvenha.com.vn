import React from 'react'
import PropTypes from 'prop-types'
import { DownloadIcon } from '../contants/icon';
import BaseIcon from './BaseIcon';
import Link from 'next/link';
import Image from 'next/image';

function BuyCard({id,photo}) {
	return (
		<div style={{width: 300}} className='bg-white rounded-md p-4 shadow-lg'>
			<Image className='rounded-lg mb-4' width={280} height={150} src={"http://localhost:5000/images/"+photo} />
			<ul className='mb-4 space-y-2 text-left text-gray-500 dark:text-gray-400'>
				<li className='flex items-center space-x-3'>
					<svg
						className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							clipRule='evenodd'></path>
					</svg>
					<span>Individual configuration</span>
				</li>
				<li className='flex items-center space-x-3'>
					<svg
						className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							clipRule='evenodd'></path>
					</svg>
					<span>No setup, or hidden fees</span>
				</li>
				<li className='flex items-center space-x-3'>
					<svg
						className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							clipRule='evenodd'></path>
					</svg>
					<span>
						Team size:{' '}
						<span className='font-semibold text-gray-900 dark:text-white'>
							1 developer
						</span>
					</span>
				</li>
				<li className='flex items-center space-x-3'>
					<svg
						className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							clipRule='evenodd'></path>
					</svg>
					<span>
						Premium support:{' '}
						<span className='font-semibold text-gray-900 dark:text-white'>
							6 months
						</span>
					</span>
				</li>
				<li className='flex items-center space-x-3'>
					<svg
						className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							clipRule='evenodd'></path>
					</svg>
					<span>
						Free updates:{' '}
						<span className='font-semibold text-gray-900 dark:text-white'>
							6 months
						</span>
					</span>
				</li>
			</ul>

			<Link
				href={{
					pathname: 'payment',
					query: {id},
				}}
				className='bg-green-500 hover:bg-green-400 transition   duration-300 ease-in-out   group text-white p-2 w-full rounded-md shadow-md mt-3 flex items-center gap-2 justify-center'>
				{/* <DownloadOutlined /> */}
				<BaseIcon
					className={'group-hover:animate-bounce'}
					width={24}
					icon={DownloadIcon}
				/>
				DOWNLOAD
			</Link>
		</div>
	);
}

BuyCard.propTypes = {
	id: PropTypes.string,
	photo: PropTypes.string,
};

export default BuyCard;
