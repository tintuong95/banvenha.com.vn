import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function BaseBreadcrumb({options}) {
	const RenderOptions = () => {
		return options.map((item, index) => (
			<Link
				className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-white'
				key={index}
				href={item.path}>
				{index !== 0 && (
					<svg
						aria-hidden='true'
						className='w-6 h-6 text-gray-400'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
							clipRule='evenodd'></path>
					</svg>
				)}
				{item.name}
			</Link>
		));
	};
	return (
		<nav
			className='flex  pt-3   rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
			aria-label='Breadcrumb'>
			<ol className='inline-flex items-center space-x-1 md:space-x-3'>
				<RenderOptions />
			</ol>
		</nav>
	);
}

BaseBreadcrumb.propTypes = {
	options: PropTypes.array,
};

export default BaseBreadcrumb;
