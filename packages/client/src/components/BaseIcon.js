import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

export default function BaseIcon({icon,name}) {
	return <Image  src={icon} alt={name} />;
}

BaseIcon.propTypes = {
	icon: PropTypes.object,
	name: PropTypes.string,
};
