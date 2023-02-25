"use client"
import React, {useState} from 'react';
import PropTypes from 'prop-types';

function BaseRange({label,min, max,unit}) {
	const [value, setValue] = useState(min);
	return (
		<div className='mb-2'>
			<label
				htmlFor='default-range'
				className='block mb-2 text-sm font-medium text-gray-900 '>
				{label}{' '}
				<div className='bg-slate-200  rounded  p-1 px-2 flex justify-between'>
					<span>{value}</span>
					<span>{unit}</span>
				</div>
			</label>
			<input
				id='default-range'
				type='range'
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				min={min}
				max={max}
				className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer '
			/>
		</div>
	);
}
BaseRange.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	label: PropTypes.string.isRequired,
	unit: PropTypes.string.isRequired,
};
export default BaseRange;
