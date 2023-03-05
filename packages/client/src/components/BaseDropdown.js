'use client'

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import BaseIcon from './BaseIcon';
import {ArrowDownIcon, ArrowRightIcon} from '../contants/icon';

function BaseDropdown({ pathname, menu,nameBtn}) {
	const renderMenu = (menu) => {
		return menu?.map((item, index) => (
			<Link key={index} href={{pathname, query: {groupId: item.groupId}}}>
				<p className='flex gap-2 items-center px-4 py-2 hover:text-rose-500 dark:hover:text-white'>
					<BaseIcon width={20} icon={ArrowRightIcon} name={'icon arrow'} />
					{item.title}
				</p>
			</Link>
		));
	};
	console.log('menu', menu);
	return (
		<div aria-hidden className='dropdown'>
			<Link
				className='text-white  py-2 flex item-center  border-b-2 border-gray-800 transform transition duration-500  '
				href={{pathname}}>
				{nameBtn}
				<BaseIcon width={20} icon={ArrowDownIcon} name={'icon arrow down'} />
			</Link>
			<div className='z-10 dropdownHover hidden hover:block  '>
				<div className='h-6 opacity-100'></div>
				<ul
					style={{width: `500px`}}
					className='py-2  text-sm bg-white   
                        rounded-lg shadow-md  dark:bg-gray-700 
                        text-gray-700 dark:text-gray-200
                        grid grid-cols-2 pb-7'
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
