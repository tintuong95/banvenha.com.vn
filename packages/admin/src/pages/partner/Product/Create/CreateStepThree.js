import { Alert, Button, Form,  } from 'antd'
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import {
	InboxOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
} from '@ant-design/icons';
export default function CreateStepThree({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) {
	const [content, setContent] = useState(null);
	const [warning, setWarning] = useState(false);
	const onFinish = () => {
		if (!content) return setWarning(true);
		onNextStep();
	};

	const onClose = () => {
		setWarning(false);
	};
	return (
		<Form
			labelCol={{
				span: 6,
			}}
			wrapperCol={{
				span: 14,
			}}
			labelAlign='left'
			onFinish={onNextStep}
			layout='horizontal'>
			{warning ? (
				<Alert
					message='Phần nội dung bài viết không được để trống !'
					type='warning'
					closable
					onClose={onClose}
					className='mb-4'
				/>
			) : (
				''
			)}
			<CKEditor
				editor={ClassicEditor}
				data='<p>Hello from CKEditor 5!</p>'
				onReady={(editor) => {
					// You can store the "editor" and use when it is needed.
					console.log('Editor is ready to use!', editor);
				}}
				onChange={(event, editor) => {
					const data = editor.getData();
					setContent(data);
					setDataProduct({...dataProduct, content: data});
					console.log({event, editor, data});
				}}
				onBlur={(event, editor) => {
					console.log('Blur.', editor);
				}}
				onFocus={(event, editor) => {
					console.log('Focus.', editor);
				}}
			/>
			<div className='m-auto flex justify-end mt-5 gap-5'>
				<Button
					className='w-1/2'
					icon={<ArrowLeftOutlined />}
					disabled={stepPage === 1}
					onClick={setStepPage}>
					Previous
				</Button>
				<Button className='w-1/2' onClick={onFinish} disabled={stepPage === 4}>
					Next
					<ArrowRightOutlined />
				</Button>
			</div>
		</Form>
	);
}

CreateStepThree.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};

