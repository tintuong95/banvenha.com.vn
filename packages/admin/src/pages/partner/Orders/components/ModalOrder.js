import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd';
import {UserOutlined, FieldTimeOutlined} from '@ant-design/icons';

function ModalOrder({visibleModal, setVisibleModal, dataModal}) {
	return (
		<Modal
		width={600}
			title={
				<div>
					<div>Tiêu đề : {dataModal?.name}</div>
					<div className='text-sm font-light flex items-center gap-2'>
						<UserOutlined />
						Người gửi : {dataModal?.name} - Thời gian : <FieldTimeOutlined />
						{moment(dataModal?.updated_at).format('hh:mm DD/MM/YYYY')}
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

ModalOrder.propTypes = {
	visibleModal: PropTypes.bool,
	setVisibleModal: PropTypes.func,
	dataModal: PropTypes.object,
};

export default ModalOrder
