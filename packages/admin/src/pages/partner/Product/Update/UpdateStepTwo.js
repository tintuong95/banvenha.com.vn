import {Button, Divider, Form, Input} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React from 'react';
import {
	InboxOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {validateRequired} from '../../../../utils/validate';
import {MESSAGE_REQUIRE_INPUT} from '../../../../contants/message';
import BaseInputEdit from '../../../../components/BaseInputEdit';
import {updateProduct} from '../../../../apis/product';

export default function UpdateStepTwo({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) {
	const onEventTarget = (evt) => {
		const {value, name} = evt.target;
		setDataProduct({...dataProduct, [name]: value});
	};
	const onChange = ({file}) => {
		console.log(file);
		setDataProduct({...dataProduct, file});
	};
	return (
		<div>
			<BaseInputEdit
				id={dataProduct?.id}
				name={'width'}
				value={dataProduct?.width}
				label={'Chiều rộng'}
				placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
				fetchUpdate={updateProduct}
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
			<BaseInputEdit
				id={dataProduct?.id}
				name={'long'}
				value={dataProduct?.long}
				label={'Chiều dài'}
				placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
				fetchUpdate={updateProduct}
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
			<BaseInputEdit
				id={dataProduct?.id}
				name={'area'}
				value={dataProduct?.area}
				label={'Diện tích'}
				placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
				fetchUpdate={updateProduct}
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
			<BaseInputEdit
				id={dataProduct?.id}
				name={'floor'}
				value={dataProduct?.floor}
				label={'Số tầng'}
				placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
				fetchUpdate={updateProduct}
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
			<BaseInputEdit
				id={dataProduct?.id}
				name={'bedroom'}
				value={dataProduct?.bedroom}
				label={'Số phòng'}
				placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
				fetchUpdate={updateProduct}
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
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
				<Form.Item label='File '>
					<Dragger
						beforeUpload={() => false}
						multiple={true}
						name='file'
						onChange={onChange}>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>
							Click or drag file to this area to upload
						</p>
					</Dragger>
				</Form.Item>
			</Form>
			<Divider />
			<div className='m-auto flex justify-end mt-5 gap-5'>
				<Button
					className='w-1/2'
					icon={<ArrowLeftOutlined />}
					disabled={stepPage === 1}
					onClick={onPreviousStep}>
					Previous
				</Button>
				<Button className='w-1/2' onClick={onNextStep} disabled={stepPage === 3}>
					Next
					<ArrowRightOutlined />
				</Button>
			</div>
		</div>
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
