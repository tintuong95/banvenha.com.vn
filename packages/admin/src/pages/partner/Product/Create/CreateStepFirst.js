import {Button, Divider, Form, Input, Select} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React, {useEffect, useState} from 'react';
import {
	InboxOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {validateRequired} from '../../../../utils/validate';
import {MESSAGE_REQUIRE_INPUT} from '../../../../contants/message';
import {InfoCircleOutlined} from '@ant-design/icons';
import {getProductGroupApi} from '../../../../apis/product';
import BaseUpload from '../../../../components/upload';

export default function CreateStepFirst({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) {
	const [productGroupList, setProductGroupList] = useState([]);
	const onEventTarget = (evt) => {
		const {value, name} = evt.target;
		setDataProduct({...dataProduct, [name]: value});
	};

	const fetchProductGroupList = () => {
		getProductGroupApi()
			.then((result) => setProductGroupList(result.data))
			.catch((err) => {
				console.log(err);
			});
	};
	const productGroupOption = () =>
		productGroupList.map((item) => ({
			label: item.title,
			value: item.id,
		}));
		
	useEffect(() => {
		fetchProductGroupList();
	}, []);

	return (
		<>
			<h1 className='mb-7'>Step 1 : TẠO BÀI SẢN PHẨM</h1>
			<Form
				labelCol={{
					span: 6,
				}}
				wrapperCol={{
					span: 18,
				}}
				labelAlign='left'
				onFinish={onNextStep}
				layout='horizontal'>
				<Form.Item
					name='title'
					label='Tên bản vẽ'
					rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}>
					<Input
						onChange={onEventTarget}
						value={dataProduct.title}
						name='title'
						placeholder='Nhập tên bài viết ấn tượng nhất :))'
					/>
				</Form.Item>
				<Divider />
				<Form.Item
					label='Nhóm '
					name='group_id'
					rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}>
					<Select
						onChange={(value) => {
							setDataProduct({...dataProduct, groupId: value});
						}}
						defaultValue={dataProduct.groupId}
						name='groupId'
						placeholder='Vui lòng chọn'
						className='w-1/2'
						// onChange={handleChange}
						options={productGroupOption()}
					/>
				</Form.Item>
				<Divider />
				<Form.Item
					label='Mô tả '
					name='description'
					onChange={onEventTarget}
					rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}>
					<Input.TextArea
						name='description'
						defaultValue={dataProduct.description}
						rows={4}
						placeholder='Nhập mô tả bài viết của bạn một cách ngắn gọn'
					/>
				</Form.Item>
				<Divider />
				<Form.Item
					label='Hình đại diện '
					name='photo'
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}>
					<BaseUpload
						field={'photo'}
						count={1}
						data={dataProduct}
						setData={setDataProduct}
					/>
				</Form.Item>
				<Divider />
				<Form.Item
					label='Hình đại diện '
					name='photoList'
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}>
					<BaseUpload
						field={'photoList'}
						count={10}
						data={dataProduct}
						setData={setDataProduct}
					/>
				</Form.Item>
				<Form.Item label='File '>
					<Dragger
						beforeUpload={() => false}
						multiple={true}
						name='file'
						onChange={'something'}>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>
							Click or drag file to this area to upload
						</p>
					</Dragger>
				</Form.Item>
				<Divider />
				<div className='m-auto flex justify-end mt-5 gap-5'>
					<Button
						className='w-1/2'
						icon={<ArrowLeftOutlined />}
						disabled={stepPage === 1}
						onClick={setStepPage}>
						Previous
					</Button>
					<Button className='w-1/2' htmlType='submit' disabled={stepPage === 3}>
						Next
						<ArrowRightOutlined />
					</Button>
				</div>
			</Form>
		</>
	);
}

CreateStepFirst.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
