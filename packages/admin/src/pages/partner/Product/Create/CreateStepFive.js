import {Button, Divider, Modal, notification, Result} from 'antd';
import PropTypes from 'prop-types';
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	MehOutlined,
	SmileOutlined,
	RobotOutlined,
	ExclamationCircleFilled,
} from '@ant-design/icons';
import {NOTIFICATION_TYPE, PRODUCT_STATE} from '../../../../contants/table';
import {createProduct} from '../../../../apis/product';
const {confirm} = Modal;
const CreateStepFive = ({
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
		data.append('price', dataProduct.price);
		data.append('file', dataProduct.file);
			data.append('sale', dataProduct.sale);
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

	return (
		<>
			<Result
				icon={<RobotOutlined />}
				status='info'
				title='Xác nhận bước cuối cùng nha !'
				subTitle='Bài viết của bạn sẽ được xét duyệt tối đa trong vòng 24h. Chúc bạn và gia đình một ngày vui vẻ ...'
				extra={[
					<Button
						onClick={() => {
							onConfirm(PRODUCT_STATE.DRAFT);
						}}
						type='primary'
						className='bg-slate-400'
						key='console'>
						<MehOutlined />
						BẢN NHÁP
					</Button>,
					<Button
						onClick={() => {
							onConfirm(PRODUCT_STATE.NORMAL);
						}}
						type='primary'
						key='buy'>
						CÔNG KHAI
						<SmileOutlined />
					</Button>,
				]}
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
					onClick={onNextStep}
					className='w-1/2'
					htmlType='submit'
					disabled={stepPage === 4}>
					Next
					<ArrowRightOutlined />
				</Button>
			</div>
		</>
	);
};
export default CreateStepFive;

CreateStepFive.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
