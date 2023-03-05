import React from 'react';
import PropTypes from 'prop-types';
import {history} from '../routes/history';
import BaseIcon from './icon';
import {AiFillFileAdd} from 'react-icons/ai';
export default function ButtonAdd({to, name}) {
	const onClick = () => {
		history.push(to);
	};
	return (
		<div
			role={'button'}
			onClick={onClick}
			aria-hidden='true'
			className='flex items-center justify-center gap-2 border hover:cursor-pointer  text-rose-600  text-lg border-rose-500 border-dashed rounded-md p-8 bg-white text-center w-100'>
			<BaseIcon className={'animate-pulse'} color='#f43f5e' size={24}>
				<AiFillFileAdd />
			</BaseIcon>
			{name}
		</div>
	);
}

ButtonAdd.propTypes = {
	to: PropTypes.string,
	name: PropTypes.string,
};
