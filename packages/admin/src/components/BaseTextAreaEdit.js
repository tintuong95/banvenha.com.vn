import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Input, Space} from 'antd';
import {
	InfoCircleOutlined,
	SettingOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons';
import { NOTIFICATION_TYPE } from '../contants/table';
import { openNotification } from '../utils/notification';


function BaseTextAreaEdit({
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
					<Input.TextArea
						readOnly={!isEdit}
						name={name}
						value={newValue}
						rows={4}
						onChange={(e) => {
							setNewValue(e.target.value);
						}}
						placeholder='Nhập mô tả bài viết của bạn một cách ngắn gọn'
					/>
					&nbsp;
					{renderAddonAfter()}
				</div>
			</Form.Item>
		</Form>
	);
}

BaseTextAreaEdit.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	tooltip: PropTypes.object,
	rules: PropTypes.array,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	fetchUpdate: PropTypes.func,
	id: PropTypes.number,
};

export default BaseTextAreaEdit;
