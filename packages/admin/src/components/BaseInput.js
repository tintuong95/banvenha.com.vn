import { Button, Input } from 'antd';
import React, { useState } from 'react'
import PropTypes from 'prop-types';

export default function BaseInput({label,value}) {
    const [readOnly,setReadOnly] = useState(true)
  return (
			<div className='grid grid-cols-6 items-center'>
				<div className='col-span-1'>{label} :</div>
				<div className='col-span-4'>
					<Input className='w-full' defaultValue={value} readOnly={readOnly} />
				</div>
				{readOnly ? <div className='col-span-1 flex justify-end'>
					<Button
						onClick={() => {
							setReadOnly(!readOnly);
						}}
						type='dashed'
						danger>
						Edit
					</Button>
				</div>:""}
                {!readOnly ? <div className='col-span-1 flex justify-end gap-2'>
					<Button
						onClick={() => {
							setReadOnly(!readOnly);
						}}
						type='dashed'
						danger>
						Close
					</Button>
					<Button
						onClick={() => {
							setReadOnly(!readOnly);
						}}
						type='dashed'
						danger>
						Save
					</Button>
				</div>:""}
				
			</div>
		);
}
BaseInput.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
};