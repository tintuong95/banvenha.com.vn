import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Input, Select, Space} from 'antd';
import {
	InfoCircleOutlined,
	SettingOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons';
import {openNotification} from '../utils/notification';
import {NOTIFICATION_TYPE} from '../contants/table';

function BaseSelectEdit({
	label,
	name,
	tooltip,
	rules,
	placeholder,
	value,
	option,
	fetchUpdate,
	id,
}) {
	const [isEdit, setIsEdit] = useState(false);
	const [newValue, setNewValue] = useState(value);
	const renderAddonAfter = () =>
		!isEdit ? (
			<Button
				className='px-2'
				onClick={() => {
					setIsEdit(!isEdit);
				}}
				icon={<SettingOutlined />}
			/>
		) : (
			<>
				<Button
					className='px-2 0'
					onClick={() => {
						setNewValue(value);
						setIsEdit(!isEdit);
					}}
					icon={<CloseCircleOutlined />}
				/>
				&nbsp;
				<Button
					htmlType='submit'
					className='px-2 '
					type='primary'
					ghost
					icon={<SaveOutlined />}
				/>
			</>
		);

	const fetchUpdateApi = () => {
		if (newValue == value) return;
		fetchUpdate(id, {[name]: newValue})
			.then((result) => {
				setNewValue(newValue);
				setIsEdit(!isEdit);
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
				console.log(result);
			})
			.catch((err) => {
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
				console.log(err);
			});
	};
	useEffect(() => {
		console.log(value, option);
		setNewValue(value);
	}, [value]);
	return (
		<Form
			labelCol={{
				span: 6,
			}}
			wrapperCol={{
				span: 18,
			}}
			labelAlign='left'
			layout='horizontal'
			onFinish={fetchUpdateApi}>
			<Form.Item label={label} name={name} rules={rules} tooltip={tooltip}>
				<div className='flex'>
					<Select
						name={name}
						value={newValue}
						placeholder='Vui lòng chọn'
						className='w-1/2'
						options={option}
						disabled={!isEdit}
						onChange={(e) => {
							setNewValue(e);
						}}
					/>
					&nbsp;
					{renderAddonAfter()}
				</div>
			</Form.Item>
		</Form>
	);
}

BaseSelectEdit.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	tooltip: PropTypes.object,
	rules: PropTypes.array,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	option: PropTypes.array,
	fetchUpdate: PropTypes.func,
	id: PropTypes.number,
};

export default BaseSelectEdit;
