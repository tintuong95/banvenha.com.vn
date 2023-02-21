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
import {NOTIFICATION_TYPE, PRODUCT_STATE} from '../../../../contants/table';
import {createProduct, updateProduct} from '../../../../apis/product';
import {validateRequired} from '../../../../utils/validate';
import {MESSAGE_REQUIRE_INPUT} from '../../../../contants/message';
import BaseInputEdit from '../../../../components/BaseInputEdit';
const {confirm} = Modal;
const UpdateStepFour = ({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) => {
	const openNotification = (type, message, description) => {
		return notification[type]({
			type,
			message,
			description,
			onClick: () => {
				console.log('Notification Clicked!');
			},
		});
	};
	const onSubmit = (state) => {
		console.log('submit', dataProduct);
		const data = new FormData();

		data.append('name', dataProduct.name);
		data.append('description', dataProduct.description);
		data.append('content', dataProduct.content);
		data.append('group_id', dataProduct.group_id);
		data.append('state', state);
		data.append('long', dataProduct.long);
		data.append('width', dataProduct.width);
		data.append('area', dataProduct.area);
		data.append('floor', dataProduct.floor);
		data.append('bedroom', dataProduct.bedroom);
		// data.append('file', dataProduct.file);
		data.append('image', dataProduct.image[0].originFileObj);

		dataProduct.images.forEach((value) => {
			data.append('images', value.originFileObj);
		});

		createProduct(data)
			.then((result) => {
				history.push('/products');
				openNotification[(NOTIFICATION_TYPE.success, 'Tạo mới thành công !')];
			})
			.catch((err) => {
				openNotification[(NOTIFICATION_TYPE.error, 'Tạo mới thất bại !')];
				console.log(err);
			});
	};

	const onConfirm = (state) => {
		confirm({
			title: 'Xác nhận tạo bài viết !',
			icon: <ExclamationCircleFilled />,
			content: 'Được duyệt trong vòng 24h !',
			onOk() {
				onSubmit(state);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};
	const onEventTarget = (evt) => {
		const {value, name} = evt.target;
		setDataProduct({...dataProduct, [name]: value});
	};

    const priceAfterSales =(price,sale)=>{
        return +price- (+price) * +sale/100;  
    }   

	return (
		<>
			<div className=' m-auto'>
				<div>
					<BaseInputEdit
						id={dataProduct?.id}
						name={'price'}
						value={dataProduct?.price}
						label={'Giá bán'}
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
						name={'sale'}
						value={dataProduct?.sale}
						label={'Sale'}
						placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
						fetchUpdate={updateProduct}
						rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
						tooltip={{
							title: 'Tooltip with customize icon',
							icon: <InfoCircleOutlined />,
						}}
					/>
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
				</div>
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
export default UpdateStepFour;

UpdateStepFour.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
