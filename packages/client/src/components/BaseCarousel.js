"use client"
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BaseViewer from './BaseViewer';
import Image from 'next/image';

const images = [
	{src: 'https://picsum.photos/750/550', alt: 'd'},
	{src: 'https://picsum.photos/750/550', alt: 'd'},

	{src: 'https://picsum.photos/750/550', alt: 'd'},

	{src: 'https://picsum.photos/750/550', alt: 'd'},

	{src: 'https://picsum.photos/750/550', alt: 'd'},
];

function BaseCarousel(props) {
	const [visible, setVisible] = useState(false);
	const [indexActive, setIndexActive] = useState(0);

	const renderListImage = (images) => {
		return images?.map((item, index) => (
			<div key={index} >
				<Image  className='' width={750} height={350} src={item.src} alt={item.alt} />
				<button
					aria-hidden
					className='legend '
					onClick={() => {
						setIndexActive(index)
						setVisible(true);
					}}>
					ZOOM
				</button>
			</div>
		));
	};

	return (
		<>
			<Carousel autoPlay>{renderListImage(images)}</Carousel>
			<BaseViewer
				indexActive={indexActive}
				images={images}
				visible={visible}
				setVisible={setVisible}
			/>
		</>
	);
}

BaseCarousel.propTypes = {};

export default BaseCarousel;
