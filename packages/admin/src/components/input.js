import {Button, Input} from 'antd';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import BaseIcon from './icon';
import {MdModeEditOutline} from 'react-icons/md';
import {AiOutlineClose, AiOutlineSave} from 'react-icons/ai';
import {updateAccount} from '../apis/account';
import {openNotification} from '../utils/notification';
import {NOTIFICATION_TYPE} from '../contants/table';

export default function BaseInput({id, label, value, edit = true,field}) {
	const [readOnly, setReadOnly] = useState(true);
	const [newValue, setNewValue] = useState(value);

	const onChange = (e) => {
		setNewValue(e.target.value);
	};

	const fetchUpdate = () => {
		const data = {[field]: newValue};
		updateAccount(id, data)
			.then((result) => {
				setReadOnly(!readOnly);
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
			})
			.catch((err) => {
				setReadOnly(!readOnly);
				setNewValue(value);
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
			});
	};

	useEffect(() => {
		setNewValue(value);
	}, [value]);

	return (
		<div className='grid grid-cols-6 items-center'>
			<div className='col-span-1'>{label} :</div>
			<div className='col-span-4'>
				<Input
					onChange={onChange}
					className='w-full'
					value={newValue}
					readOnly={readOnly}
				/>
			</div>
			{edit ? (
				<div>
					{readOnly ? (
						<div className='col-span-1 flex justify-end'>
							<Button
								onClick={() => {
									setReadOnly(!readOnly);
								}}
								type='link'>
								<BaseIcon>
									<MdModeEditOutline />
								</BaseIcon>
							</Button>
						</div>
					) : (
						''
					)}
					{!readOnly ? (
						<div className='col-span-1 flex justify-end gap-2'>
							<Button
								onClick={() => {
									setNewValue(value)
									setReadOnly(!readOnly);
								}}
								type=''>
								<BaseIcon>
									<AiOutlineClose />
								</BaseIcon>
							</Button>
							<Button onClick={fetchUpdate} type='primary'>
								<BaseIcon>
									<AiOutlineSave />
								</BaseIcon>
							</Button>
						</div>
					) : (
						''
					)}
				</div>
			) : (
				''
			)}
		</div>
	);
}
BaseInput.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	edit: PropTypes.bool,
	field: PropTypes.string,
};
