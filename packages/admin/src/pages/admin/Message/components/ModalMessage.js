import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Input, Modal} from 'antd';
import {UserOutlined, FieldTimeOutlined} from '@ant-design/icons';

function ModalMessage({
	visibleModal,
	setVisibleModal,
	dataModal,
	setDataModal,
}) {
	return (
		<Modal
			width={600}
			title={'Gửi tin nhắn '}
			centered
			open={visibleModal}
			onOk={() => setVisibleModal(false)}
			onCancel={() => setVisibleModal(false)}>
			<div className='flex flex-col gap-3'>
				{/* <div className='text-gray-500'>Tên đối tác</div>
				<Input placeholder='Tên đối tác' /> */}
				<div className='text-gray-500'>Tiêu đề</div>
				<Input
					placeholder='Tiêu đề tinh nhắn'
					onChange={(e) => setDataModal({...dataModal, title: e.target.value})}
					value={dataModal.title}
				/>
				<div className='text-gray-500'>Nội dung</div>
				<Input.TextArea
					onChange={(e) => setDataModal({...dataModal, content: e.target.value})}
					value={dataModal.content}
					placeholder='Nội dung tin nhắn'
					className='content border  border-gray-300 rounded p-3 '
					style={{minHeight: 300}}></Input.TextArea>
			</div>
		</Modal>
	);
}

ModalMessage.propTypes = {
	visibleModal: PropTypes.bool,
	setVisibleModal: PropTypes.func,
	dataModal: PropTypes.object,
	setDataModal: PropTypes.func,
};

export default ModalMessage;
