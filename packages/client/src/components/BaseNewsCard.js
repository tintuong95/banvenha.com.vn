import React from 'react';
import BaseIcon from './BaseIcon';
import { AuthorIcon } from '../contants/icon';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';

export default function BaseNewsCard({data}) {
	const {name, admin, image,param} = data;
	return (
		<Link href={'/tin-tuc/' + param}>
			<div className='flex flex-col'>
				<Image
					width={300}
					height={200}
					className='rounded-md'
					alt='me'
					src={'http://localhost:5000/images/' + image}
				/>
				<div className='font-semibold  text-gray-800 m-3 mb-1'>{name}</div>
				<div className=' mx-2 text-sm text-gray-400 flex items-center gap-2'>
					<BaseIcon name={'author icon'} icon={AuthorIcon} />
					{admin.name}
				</div>
			</div>
		</Link>
	);
}

BaseNewsCard.propTypes = {
	data: PropTypes.object,
};
