import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import ImageDefault from './iamgedeault.jpg';
import {axios} from '../config/axios';

export default function BaseAvatar({src}) {
	const imageRef = useRef();

	const fetchImage = () => {
		axios
			.get(src, {responseType: 'blob'})
			.then((res) => {
				var urlCreator = window.URL || window.webkitURL;
				var imageUrl = urlCreator.createObjectURL(res.data);
				imageRef.current.src = imageUrl;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchImage();
	}, []);
	return (
		<img
			ref={imageRef}
			src={ImageDefault}
			className="w-32 h-24 object-cover  rounded-md  "
			alt='d'
			onError={() => {
				// setLoading(true);
			}}
			onLoad={() => {
				// setLoading(e);
			}}
		/>
	);
}

BaseAvatar.propTypes = {
	src: PropTypes.string,
};
