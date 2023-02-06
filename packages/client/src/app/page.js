'use client';

import {  Divider} from 'antd';

import BaseSection from '../components/BaseSection';
import BaseSlider from '../components/BaseSlider';
import Keyword from '../components/Keyword';
import SeachInput from '../components/SeachInput';

export default function Home() {
	return (
		<div className=''>
		<SeachInput/>
			<div className='my-7'>
				<BaseSlider/>
			</div>
			<BaseSection />
			<Divider />
			<BaseSection />
			<Divider />
			<BaseSection />
			<Divider />

			<Keyword/>
		</div>
	);
}
