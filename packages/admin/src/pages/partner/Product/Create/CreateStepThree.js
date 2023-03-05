import {Button, Divider, Form, Input, Modal, notification, Result, Tag} from 'antd';
import PropTypes from 'prop-types';
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	MehOutlined,
	SmileOutlined,
	RobotOutlined,
	ExclamationCircleFilled,
	InfoCircleOutlined,
} from '@ant-design/icons';
import {NOTIFICATION_TYPE, PRODUCT_PUBLISHED} from '../../../../contants/table';
import {createProduct} from '../../../../apis/product';
import {validateRequired} from '../../../../utils/validate';
import {MESSAGE_REQUIRE_INPUT} from '../../../../contants/message';
const {confirm} = Modal;
const CreateStepThree = ({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) => {
	



	const onEventTarget = (evt) => {
		const {value, name} = evt.target;
		setDataProduct({...dataProduct, [name]: value});
	};

    const priceAfterSales =(price,sale)=>{
        return +price- (+price) * +sale/100;  
    }   

	return (
		<>
			<h1 className='mb-7'>Step 3 : TẠO MỚI SẢN PHẨM</h1>
			<div className=' m-auto'>
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
						name='name'
						label='Giá bán'
						rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
						tooltip={{
							title: 'Tooltip with customize icon',
							icon: <InfoCircleOutlined />,
						}}>
						<Input
							onChange={onEventTarget}
							value={dataProduct.name}
							name='price'
							placeholder='Lựa chọn giá thích hợp nhất ...'
							addonAfter='VND'
						/>
					</Form.Item>
					<Divider />
					<Form.Item
						name='sale'
						label='Sale'
						rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
						tooltip={{
							title: 'Tooltip with customize icon',
							icon: <InfoCircleOutlined />,
						}}>
						<Input
							onChange={onEventTarget}
							value={dataProduct.sale}
							name='sale'
							placeholder='Lựa chọn mức giảm giá thích hợp nhất ...'
							addonAfter='%'
						/>
					</Form.Item>
					<Divider />
					<Form.Item
						name='lastprice'
						label='Giá cuối'
						rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
						tooltip={{
							title: 'Tooltip with customize icon',
							icon: <InfoCircleOutlined />,
						}}>
						<Tag className='text-base' color='#2db7f5'>
							{priceAfterSales(dataProduct.price, dataProduct.sale).toLocaleString(
								'vi-VN'
							)}{' '}
							&nbsp; VND
						</Tag>
					</Form.Item>
				</Form>
			</div>
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
					onClick={onNextStep}
					className='w-1/2'
					htmlType='submit'
					disabled={stepPage === 5}>
					Next
					<ArrowRightOutlined />
				</Button>
			</div>
		</>
	);
};
export default CreateStepThree;

CreateStepThree.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
