import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd';
import {UserOutlined, FieldTimeOutlined} from '@ant-design/icons';

function ModalMessage({visibleModal, setVisibleModal, dataModal}) {
	return (
		<Modal
			width={600}
			title={
				<div>
					<div>Tiêu đề : {dataModal?.title}</div>
					<div className='text-sm font-light flex items-center gap-2'>
						<UserOutlined />
						Người gửi : {dataModal?.title} - Thời gian : <FieldTimeOutlined />
						{moment(dataModal?.updatedAt).format('hh:mm DD/MM/YYYY')}
					</div>
				</div>
			}
			centered
			open={visibleModal}
			onOk={() => setVisibleModal(false)}
			onCancel={() => setVisibleModal(false)}>
			<div
				className='content border border-dashed border-gray-300 rounded p-3 '
				style={{minHeight: 300}}>
				{dataModal?.content}
			</div>
		</Modal>
	);
}

ModalMessage.propTypes = {
	visibleModal: PropTypes.bool,
	setVisibleModal: PropTypes.func,
	dataModal: PropTypes.object,
};

export default ModalMessage
