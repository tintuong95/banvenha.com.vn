import React from 'react';
import {IconContext} from 'react-icons/lib';
import PropTypes from 'prop-types';
export default function BaseIcon({children, color, size, className}) {
	return (
		<div className={`flex items-center ${className}`}>
			<IconContext.Provider value={{color, size}}>{children}</IconContext.Provider>
		</div>
	);
}

BaseIcon.propTypes = {
	children: PropTypes.any,
	color: PropTypes.string,
	size: PropTypes.number,
	className: PropTypes.string,
};
