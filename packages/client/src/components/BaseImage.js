'use client';

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { ImageDefault } from '../contants/image';


function BaseImage({image, name}) {
	const [error, setError] = useState(false);

	return (
		<Image
			width={300}
			height={200}
			className=''
			src={!error ? 'http://localhost:5000/images/' + image : ImageDefault}
			alt={name}
			onErrorCapture={() => {
				setError(true);
			}}
		/>
	);
}

BaseImage.propTypes = {
	image: PropTypes.string,
	name: PropTypes.string,
};

export default BaseImage;
