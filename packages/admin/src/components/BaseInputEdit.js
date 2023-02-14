import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Input, notification} from 'antd';
import {
	InfoCircleOutlined,
	SettingOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons';
import {validateRequired} from '../utils/validate';
import {MESSAGE_REQUIRE_INPUT} from '../contants/message';
import {openNotification} from '../utils/notification';
import {NOTIFICATION_TYPE} from '../contants/table';

function BaseInputEdit({
	label,
	name,
	tooltip,
	rules,
	placeholder,
	value,
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
					<Input
						readOnly={!isEdit}
						onChange={(e) => {
							setNewValue(e.target.value);
						}}
						name={name}
						value={newValue}
						placeholder={placeholder}
					/>
					&nbsp;
					{renderAddonAfter()}
				</div>
			</Form.Item>
		</Form>
	);
}

BaseInputEdit.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	tooltip: PropTypes.object,
	rules: PropTypes.array,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	fetchUpdate: PropTypes.func,
	id: PropTypes.number,
};

export default BaseInputEdit;
