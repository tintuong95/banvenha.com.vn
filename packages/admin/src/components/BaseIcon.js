import React from 'react';
import {IconContext} from 'react-icons/lib';
import PropTypes from 'prop-types';
export default function BaseIcon({children, color, size}) {
	return (
		<IconContext.Provider value={{color, size}}>{children}</IconContext.Provider>
	);
}

BaseIcon.propTypes = {
	children: PropTypes.any,
	color: PropTypes.string,
	size: PropTypes.number,
};
