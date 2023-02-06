import { Carousel } from 'antd';
import Image from 'next/image';
import React from 'react'
import { ImageSliderOne, ImageSliderThree, ImageSliderTwo } from '../contants/image';

export default function BaseSlider() {
  return (
			<Carousel autoplay className=' '>
				<Image className='rounded-xl' src={ImageSliderTwo} />
				<Image className='rounded-xl' src={ImageSliderOne} />

				<Image className='rounded-xl' src={ImageSliderThree} />
			</Carousel>
		);
}
