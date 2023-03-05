import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import ImageDefault from './iamgedeault.jpg';
import {axios} from '../config/axios';

export default function BaseAvatar({src}) {
	const imageRef = useRef();

	const fetchImage = () => {
		axios
			.get('http://localhost:5000/images/'+src, {responseType: 'blob'})
			.then((res) => {
				console.log("data",res.data)
				var urlCreator = window.URL || window.webkitURL;
				var imageUrl = urlCreator.createObjectURL(res.data);
				
				imageRef.current.src = imageUrl;
			})
			.catch((err) => {
					console.log('data');
				console.log(err);
			});
	};

	useEffect(() => {
		fetchImage();
	}, [src]);
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
