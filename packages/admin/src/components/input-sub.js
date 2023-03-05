import {Button, Input, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import BaseIcon from './icon';
import {MdModeEditOutline} from 'react-icons/md';
import {AiOutlineClose, AiOutlineSave} from 'react-icons/ai';
import {updateAccount} from '../apis/account';
import {openNotification} from '../utils/notification';
import {
	NOTIFICATION_TYPE,
	PARTNER_STATUS,
	PARTNER_STATUS_TEXT,
} from '../contants/table';
import {
	DeleteOutlined,
	ClockCircleOutlined,
	DownCircleOutlined,
	LockOutlined,
} from '@ant-design/icons';

export default function BaseInputSub({id, label, value, edit = true, field, deletedAt}) {
	const [readOnly, setReadOnly] = useState(true);
	const [newValue, setNewValue] = useState(value);

	const onChange = (e) => {
		setNewValue(e.target.value);
	};

	const statusRender = (status, deletedAt) => {
		if (deletedAt)
			return (
				<Button
					size='small'
					className='border-gray-500 bg-gray-400 text-white'
					icon={<DeleteOutlined style={{color: 'white'}} />}>
					Deleted
				</Button>
			);
		else if (status == PARTNER_STATUS.process)
			return (
				<Button
					size='small'
					className='border-sky-500 bg-sky-400 text-white'
					icon={<ClockCircleOutlined spin={180} style={{color: 'white'}} />}>
					{PARTNER_STATUS_TEXT[PARTNER_STATUS.process]}
				</Button>
			);
		else if (status == PARTNER_STATUS.actived)
			return (
				<Button
					size='small'
					className='border-green-500 bg-green-400 text-white'
					icon={<DownCircleOutlined style={{color: 'white'}} />}>
					{PARTNER_STATUS_TEXT[PARTNER_STATUS.actived]}
				</Button>
			);
		else if (status == PARTNER_STATUS.blocked)
			return (
				<Button
					size='small'
					className='border-red-500 bg-red-400 text-white'
					icon={<LockOutlined style={{color: 'white'}} />}>
					{PARTNER_STATUS_TEXT[PARTNER_STATUS.blocked]}
				</Button>
			);
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
				{/* <Input
					onChange={onChange}
					className='w-full'
					value={newValue}
					readOnly={readOnly}
				/> */}
				{statusRender(value, deletedAt)}
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
									setNewValue(value);
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
BaseInputSub.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	edit: PropTypes.bool,
	field: PropTypes.string,
	deletedAt: PropTypes.string,
};
