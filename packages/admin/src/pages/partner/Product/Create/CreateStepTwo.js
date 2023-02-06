import { Form, Input } from 'antd'
import Dragger from 'antd/es/upload/Dragger';
import React from 'react'
import {InboxOutlined} from '@ant-design/icons';
export default function CreateStepTwo() {
    return (
					<Form
						labelCol={{
							span: 6,
						}}
						wrapperCol={{
							span: 14,
						}}
						layout='horizontal'>
						<Form.Item label='Chiều rộng'>
							<Input />
						</Form.Item>
						<Form.Item label='Chiều dài'>
							<Input />
						</Form.Item>
						<Form.Item label='Diện tích '>
							<Input />
						</Form.Item>
						<Form.Item label='Số phòng ngủ'>
							<Input />
						</Form.Item>
						<Form.Item label='Số tầng'>
							<Input />
						</Form.Item>
						<Form.Item label='File '>
							<Dragger name='file'>
								<p className='ant-upload-drag-icon'>
									<InboxOutlined />
								</p>
								<p className='ant-upload-text'>
									Click or drag file to this area to upload
								</p>
							</Dragger>
						</Form.Item>
					</Form>
				);
}
