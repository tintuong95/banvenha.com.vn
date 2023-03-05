import React from 'react';
import BaseIcon from './BaseIcon';
import { AuthorIcon } from '../contants/icon';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import BaseImage from './BaseImage';
import { useRouter } from 'next/navigation';

export default function BaseNewsCard({data}) {
	const {title, account, photo,slug} = data;
	
	
	return (
		<Link href={'/blog/' + slug}>
			<div className='flex flex-col overflow-hidden  border rounded-md bg-white   transform transition duration-500 hover:scale-105'>
				<BaseImage className={''} image={photo} name={title} />

				<div className='p-3'>
					<div className='font-semibold  text-gray-600  mb-2 line-2'>{title}</div>
					<div className=' mx-2 hover:text-rose-600 text-sm text-gray-400 flex items-center gap-2'>
						<BaseIcon
							name={'author icon'}
							icon={
								'https://i.pinimg.com/736x/fb/6c/cb/fb6ccbd88bd0ac4e2585dc3fc716c221--places-to-visit.jpg'
							}
							className={'rounded-full h-6 w-6  object-cover shadow-md'}
						/>
						<Link href={"author/"+data.account.id}>{account.fullName}</Link>
					</div>
				</div>
			</div>
		</Link>
	);
}

BaseNewsCard.propTypes = {
	data: PropTypes.object,
};
