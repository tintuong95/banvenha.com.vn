import {Alert, Button, Divider, Form} from 'antd';
import React, {useEffect, useState} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build'
import {useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import {
	ArrowLeftOutlined,
	SettingOutlined,
	CloseCircleOutlined,
	SaveOutlined,
	ArrowRightOutlined,
} from '@ant-design/icons';
import { updateNews } from '../../../../apis/news';
import { openNotification } from '../../../../utils/notification';
import { NOTIFICATION_TYPE } from '../../../../contants/table';

export default function CreateStepTwo({
	stepPage,
	setStepPage,
	onPreviousStep,
	onNextStep,
	dataNews,
	setDataNews,
}) {
	const [content, setContent] = useState(dataNews.content);
	const [warning, setWarning] = useState(false);
		const [isEdit, setIsEdit] = useState(false);
	const onFinish = () => {
		if (!content) return setWarning(true);
		onNextStep();
	};

	const onClose = () => {
		setWarning(false);
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
						setContent(dataNews.content);
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
const fetchUpdateApi = () => {
		if (content == dataNews.content) return;
		updateNews(dataNews.id, {['content']: content})
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
	useEffect(() => {
		setContent(dataNews.content);
	}, [dataNews.content]);

	return (
		<Form
			labelCol={{
				span: 6,
			}}
			wrapperCol={{
				span: 14,
			}}
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
				editor={ClassicEditor}
				data={content}
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
				disabled={!isEdit}
			/>
			<Divider />
			<div className='m-auto flex justify-end mt-5 gap-5'>
				<Button
					className='w-1/2'
					icon={<ArrowLeftOutlined />}
					disabled={stepPage === 1}
					onClick={onPreviousStep}>
					Previous
				</Button>
				<Button
					onClick={onFinish}
					className='w-1/2'
					htmlType='submit'
					disabled={stepPage === 3}>
					Next
					<ArrowRightOutlined />
				</Button>
			</div>
		</Form>
	);
}

CreateStepTwo.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataNews: PropTypes.object,
	setDataNews: PropTypes.func,
};
