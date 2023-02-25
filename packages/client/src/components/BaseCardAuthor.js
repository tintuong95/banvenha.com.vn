import React from 'react'
import PropTypes from 'prop-types'

function BaseCardAuthor(props) {
  return (
			<div style={{width:280}} className='  bg-white rounded-lg shadow-lg '>
				<div className='flex flex-col items-center py-8 mt-6'>
					<img
						className='w-24 h-24 mb-3 rounded-full shadow-lg'
						src='https://picsum.photos/200/300'
						alt='Bonnie im'
					/>
					<h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
						Bonnie Green
					</h5>
					<span className='text-sm text-gray-500 dark:text-gray-400'>
						Visual Designer
					</span>
					<div className='flex mt-4 space-x-3 md:mt-6'>
						<a
							href='#a'
							className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							Add friend
						</a>
						<a
							href='#a'
							className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'>
							Message
						</a>
					</div>
				</div>
			</div>
		);
}

BaseCardAuthor.propTypes = {}

export default BaseCardAuthor
