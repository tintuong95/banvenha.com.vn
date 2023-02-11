import React from 'react';
import PropTypes from 'prop-types';
import {history} from '../routes';

export default function AddButton({to}) {
	const onClick = () => {
		history.push(to);
	};
	return (
		<div
			role={'button'}
			onClick={onClick}
			aria-hidden='true'
			className='border hover:cursor-pointer border-sky-500 border-dashed rounded-md p-8 bg-white text-center w-100'>
			THÊM MỚI 
		</div>
	);
}

AddButton.propTypes = {
	to: PropTypes.string,
};
