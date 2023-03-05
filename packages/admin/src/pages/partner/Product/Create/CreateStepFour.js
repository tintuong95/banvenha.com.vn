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
import {NOTIFICATION_TYPE, PRODUCT_PUBLISHED} from '../../../../contants/table';
import {createProduct} from '../../../../apis/product';
import { openNotification } from '../../../../utils/notification';
const {confirm} = Modal;
const CreateStepFour = ({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) => {
	
	const onSubmit = (published) => {
		console.log('submit', dataProduct);
		const data = new FormData();

		data.append('title', dataProduct.title);
		data.append('description', dataProduct.description);
		data.append('content', dataProduct.content);
		data.append('groupId', dataProduct.groupId);
		data.append('published', published);
		data.append('price', +dataProduct.price);
		data.append('file', dataProduct.file);
		data.append('sale', dataProduct.sale);
		data.append('photo', dataProduct.photo[0].originFileObj);

		dataProduct.photoList.forEach((value) => {
			data.append('photoList', value.originFileObj);
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
							onConfirm(PRODUCT_PUBLISHED.DRAFT);
						}}
						type='primary'
						className='bg-slate-400'
						key='console'>
						<MehOutlined />
						BẢN NHÁP
					</Button>,
					<Button
						onClick={() => {
							onConfirm(PRODUCT_PUBLISHED.NORMAL);
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
export default CreateStepFour;

CreateStepFour.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
