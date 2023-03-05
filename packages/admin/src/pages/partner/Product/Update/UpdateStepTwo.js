import {Alert, Button, Form} from 'antd';
import React, {useState} from 'react';
import Editor from 'ckeditor5-custom-build';
import PropTypes from 'prop-types';
import {
	InboxOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
	SettingOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons';
import {updateProduct} from '../../../../apis/product';
import {openNotification} from '../../../../utils/notification';
import {NOTIFICATION_TYPE} from '../../../../contants/table';
import {CKEditor} from '@ckeditor/ckeditor5-react';
export default function UpdateStepTwo({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) {
	const [content, setContent] = useState(dataProduct.content);
	const [warning, setWarning] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const onFinish = () => {
		if (!content) return setWarning(true);
		onNextStep();
	};
	const fetchUpdateApi = () => {
		if (content == dataProduct.content) return;
		updateProduct(dataProduct.id, {['content']: content})
			.then((result) => {
				setContent(content);
				setIsEdit(!isEdit);
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
				console.log(result);
			})
			.catch((err) => {
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
				console.log(err);
			});
	};
	const renderAddonAfter = () =>
		!isEdit ? (
			<Button
				className='px-2'
				onClick={() => {
					setIsEdit(!isEdit);
				}}
				icon={<SettingOutlined onClick={changeStateEdit} />}
			/>
		) : (
			<>
				<Button
					className='px-2 0'
					onClick={() => {
						setContent(dataProduct.content);
						setIsEdit(!isEdit);
					}}
					icon={<CloseCircleOutlined onClick={changeStateEdit} />}
				/>
				&nbsp;
				<Button
					className='px-2 '
					type='primary'
					ghost
					onClick={fetchUpdateApi}
					icon={<SaveOutlined onClick={changeStateEdit} />}
				/>
			</>
		);
	const changeStateEdit = () => {
		setIsEdit(!isEdit);
	};

	const onClose = () => {
		setWarning(false);
	};
	return (
		<>
			<h1 className='mb-7'>Step 2 : CẬP NHẬT SẢN PHẨM</h1>
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
				<div className='mb-3'>{renderAddonAfter()}</div>
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
					editor={Editor}
					data={dataProduct.content}
					onReady={(editor) => {
						// You can store the "editor" and use when it is needed.
						console.log('Editor is ready to use!', editor);
					}}
					onChange={(event, editor) => {
						const data = editor.getData();
						setContent(data);
						console.log({event, editor, data});
					}}
					onBlur={(event, editor) => {
						console.log('Blur.', editor);
					}}
					onFocus={(event, editor) => {
						console.log('Focus.', editor);
					}}
					config={{
						ckfinder: {
							uploadUrl: 'http://localhost:5000/v1/api/upload/single',
							withCredentials: true,
						},
					}}
					disabled={!isEdit}
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
		</>
	);
}

UpdateStepTwo.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
