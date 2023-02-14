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
import { validateRequired } from '../../../../utils/validate';
import { MESSAGE_REQUIRE_INPUT } from '../../../../contants/message';



export default function CreateStepTwo({
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

	return (
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
				name='width'
				label='Chiều rộng'
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}>
				<Input
					onChange={onEventTarget}
					value={dataProduct.width}
					name='width'
					placeholder='Chiều rộng'
				/>
			</Form.Item>
			<Divider />
			<Form.Item
				name='long'
				label='Chiều daì'
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}>
				<Input
					onChange={onEventTarget}
					value={dataProduct.long}
					name='long'
					placeholder='Chiều rộng'
				/>
			</Form.Item>
			<Divider />
			<Form.Item
				name='area'
				label='Diện tích'
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}>
				<Input
					onChange={onEventTarget}
					value={dataProduct.area}
					name='area'
					placeholder='Diện tích'
				/>
			</Form.Item>
			<Divider />
			<Form.Item
				name='floor'
				label='Số tầng'
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}>
				<Input
					onChange={onEventTarget}
					value={dataProduct.floor}
					name='area'
					placeholder='Số tầng'
				/>
			</Form.Item>
			<Divider />
			<Form.Item
				name='bedroom'
				label='Số phòng ngủ'
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}>
				<Input
					onChange={onEventTarget}
					value={dataProduct.bedroom}
					name='area'
					placeholder='Số phòng ngủ'
				/>
			</Form.Item>
			<Divider />
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
	);
}
CreateStepTwo.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
