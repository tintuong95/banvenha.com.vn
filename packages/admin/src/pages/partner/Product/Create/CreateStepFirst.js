import { Form, Input, Select } from 'antd'
import Dragger from 'antd/es/upload/Dragger';
import React from 'react'
import {InboxOutlined} from '@ant-design/icons';
export default function CreateStepFirst() {
    return (
					<Form
						labelCol={{
							span: 6,
						}}
						wrapperCol={{
							span: 14,
						}}
						layout='horizontal'>
						<Form.Item label='Tên bản vẽ'>
							<Input />
						</Form.Item>
						<Form.Item label='Mô tả '>
							<Input.TextArea rows={4} />
						</Form.Item>
						<Form.Item label='Nhóm '>
							<Select
								defaultValue='Nhà cấp 4'
								options={[{value: 'Nhà cấp 4', label: 'Nhà cấp 4'}]}
							/>
						</Form.Item>
						<Form.Item label='Hình đại diện '>
							<Dragger name='file'>
								<p className='ant-upload-drag-icon'>
									<InboxOutlined />
								</p>
								<p className='ant-upload-text'>
									Click or drag file to this area to upload
								</p>
							</Dragger>
						</Form.Item>
						<Form.Item label='Danh sách ảnh '>
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
