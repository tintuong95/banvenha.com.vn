import {Form, Input} from 'antd';
import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
export default function NewsDetails() {
	return (
		<div className='w-2/4 m-auto'>
			<div className='section bg-white border rounded p-4 mb-5 pt-10'>
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
						<Input />
					</Form.Item>
					<Form.Item label='Nhóm '>
						<Input />
					</Form.Item>
					<Form.Item label='Hình đại diện '>
						<Input />
					</Form.Item>
				</Form>
			</div>
			<div className='section bg-white border rounded p-4 mb-5 pt-10'>
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
					<Form.Item label='File'>
						<Input />
					</Form.Item>
				</Form>
			</div>
			<div className='section bg-white border rounded p-4 pt-10'>
				<Form
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 14,
					}}
					layout='horizontal'>
					<CKEditor
						editor={Editor}
						data='<p>Hello from CKEditor 5!</p>'
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
							console.log('Editor is ready to use!', editor);
						}}
						onChange={(event, editor) => {
							const data = editor.getData();
							console.log({event, editor, data});
						}}
						onBlur={(event, editor) => {
							console.log('Blur.', editor);
						}}
						onFocus={(event, editor) => {
							console.log('Focus.', editor);
						}}
					/>
				</Form>
			</div>
		</div>
	);
}
