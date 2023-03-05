'use client';

import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

export default function BaseIcon({icon, name, width, height, className}) {
	return (
		<Image
			className={className}
			color='red'
			width={width || 30}
			height={height || 30}
			src={icon}
			alt={name}
		/>
	);
}

BaseIcon.propTypes = {
	icon: PropTypes.object,
	name: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
};
