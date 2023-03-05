import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Modal, Upload} from 'antd';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
	InfoCircleOutlined,
	SettingOutlined,
	CloseCircleOutlined,
	SaveOutlined,
} from '@ant-design/icons';
import {openNotification} from '../utils/notification';
import {NOTIFICATION_TYPE} from '../contants/table';

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const BaseUploadEdit = ({data, count, field, fetchUpdate, label, tooltip}) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);
	const handleCancel = () => setPreviewOpen(false);
	const [isEdit, setIsEdit] = useState(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
		);
	};
	const handleChange = ({fileList: newFileList}) => {
		return setFileList(newFileList);
	};

	const uploadButton = (
		<div className='w-full '>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}>
				Upload
			</div>
		</div>
	);
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
						setIsEdit(!isEdit);
						if (typeof data[field] === 'string') {
							setFileList([{url: 'http://localhost:3002/images/' + data[field]}]);
						} else {
							let newArray = [];
							data[field].forEach((item) => {
								newArray.push({url: 'http://localhost:3002/images/' + item.name});
							});
							setFileList(newArray);
						}
					}}
					icon={<CloseCircleOutlined />}
				/>
				&nbsp;
				<Button
					htmlType='submit'
					className='px-2 '
					type='primary'
					ghost
					onClick={() => {
						fetchUpdateApi();
					}}
					icon={<SaveOutlined />}
				/>
			</>
		);
	const fetchUpdateApi = () => {
		const newData = new FormData();

		fileList.forEach((item) => {
			if (item.originFileObj) {
				newData.append([field], item.originFileObj);
			}
		});
		fetchUpdate(data.id, newData)
			.then((result) => {
				// setNewValue(newValue);
				setIsEdit(!isEdit);
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
			})
			.catch((err) => {
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
				console.log(err);
			});
	};

	useEffect(() => {
		if(data[field]){
			if (typeof data[field] === 'string') {
				setFileList([{url: 'http://localhost:3002/images/' + data[field]}]);
			} else {
				let newArray = [];
				data[field].forEach((item) => {
				
					newArray.push({url: 'http://localhost:3002/images/' + item.path});
				});
				setFileList(newArray);
			}
		}
	}, [data]);
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
			// onFinish={}
		>
			<Form.Item label={label} name={name} tooltip={tooltip}>
				<div className='flex'>
					<Upload
						disabled={!isEdit}
						beforeUpload={() => false}
						listType='picture-card'
						fileList={fileList}
						onPreview={handlePreview}
						onChange={handleChange}>
						{fileList.length >= count ? null : uploadButton}
					</Upload>
					<Modal
						open={previewOpen}
						title={previewTitle}
						footer={null}
						onCancel={handleCancel}>
						<img
							alt='example'
							style={{
								width: '100%',
							}}
							src={previewImage}
						/>
					</Modal>
					&nbsp;
					{renderAddonAfter()}
				</div>
			</Form.Item>
		</Form>
	);
};
export default BaseUploadEdit;

BaseUploadEdit.propTypes = {
	data: PropTypes.object,
	setData: PropTypes.func,
	count: PropTypes.number,
	field: PropTypes.string,
	fetchUpdate: PropTypes.func,
	label: PropTypes.string,
	tooltip: PropTypes.string,
};
