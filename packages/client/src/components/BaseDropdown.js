'use client'

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import BaseIcon from './BaseIcon';
import {ArrowRightIcon} from '../contants/icon';
import {useRouter} from 'next/navigation';

function BaseDropdown({ pathname, menu,nameBtn}) {
	const router = useRouter();
	const renderMenu = (menu) => {
		return menu?.map((item, index) => (
			<Link key={index} href={{pathname, query: {group_id: item.group_id}}}>
				<p className='flex gap-2 px-4 py-2 hover:text-rose-500 dark:hover:text-white'>
					<BaseIcon icon={ArrowRightIcon} name={'icon arrow'} />
					{item.name}
				</p>
			</Link>
		));
	};
	return (
		<div aria-hidden className='dropdown'>
			<Link
				className='text-white  py-2   border-b-2 border-gray-800 transform transition duration-500 hover:border-b-rose-500 '
				href={{pathname}}>
				{nameBtn}
			</Link>
			<div className='z-10 dropdownHover hidden hover:block '>
				<div className='h-3 opacity-100'></div>
				<ul
					style={{width: `500px`}}
					className='py-2  text-sm bg-white   
                        rounded-lg shadow  dark:bg-gray-700 
                        text-gray-700 dark:text-gray-200
                        grid grid-cols-2 pb-14'
					aria-labelledby='dropdownHoverButton'>
					{renderMenu(menu)}
				</ul>
			</div>
		</div>
	);
}

BaseDropdown.propTypes = {
	pathname: PropTypes.string,
	menu: PropTypes.array,
	nameBtn: PropTypes.string,
};

export default BaseDropdown;
