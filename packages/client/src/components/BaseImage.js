'use client';

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {ImageDefault} from '../contants/image';

function BaseImage({image, name,className}) {
	const [error, setError] = useState(false);

	return (
		<Image
			width={300}
			height={200}
			className={className}
			src={!error ? 'http://localhost:5000/images/' + image : ImageDefault}
			alt={name}
			onErrorCapture={() => {
				setError(true);
			}}
			style={{width: 300, height: 150, objectFit: 'cover'}}
		/>
	);
}

BaseImage.propTypes = {
	image: PropTypes.string,
	name: PropTypes.string,
	className: PropTypes.string,
};

export default BaseImage;
