import React from 'react'
import PropTypes from 'prop-types'

function BaseCardAuthor(props) {
  return (
			<div style={{width: 300}} className='  bg-white rounded-md shadow-lg '>
				<div className='flex flex-col items-center py-8 '>
					<img
						className='w-24 h-24 mb-3 rounded-full shadow-lg'
						src='https://picsum.photos/200/300'
						alt='Bonnie im'
					/>
					<h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
						Phan Tin Tưởng
					</h5>
					<span className='text-sm text-gray-500 dark:text-gray-400'>
						tintuong@gmail.com
					</span>
					<div className='flex mt-4 space-x-3 md:mt-6'>
						<a
							href='#a'
							className='inline-flex items-center px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg'>
							Thông tin
						</a>
						<a
							href='#a'
							className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-rose-500 bg-white border border-rose-300 rounded-lg'>
							Yêu thích
						</a>
					</div>
				</div>
			</div>
		);
}

BaseCardAuthor.propTypes = {}

export default BaseCardAuthor
