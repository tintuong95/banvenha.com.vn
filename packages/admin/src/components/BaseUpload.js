import {PlusOutlined} from '@ant-design/icons';
import {Modal, Upload} from 'antd';
import {useState} from 'react';
import PropTypes from "prop-types"

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const BaseUpload = ({data,setData,count}) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);
	const handleCancel = () => setPreviewOpen(false);
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
		setData({...data, file: newFileList[0]?.originFileObj});
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
	return (
		<>
			<Upload
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
		</>
	);
};
export default BaseUpload;

BaseUpload.propTypes = {
	data: PropTypes.object,
	setData: PropTypes.func,
	count: PropTypes.number,
};
