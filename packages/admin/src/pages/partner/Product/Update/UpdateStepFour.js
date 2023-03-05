import {Badge, Button, Divider, Modal, notification, Result} from 'antd';
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
import {createProduct, updateProduct} from '../../../../apis/product';
import { openNotification } from '../../../../utils/notification';
const {confirm} = Modal;


const UpdateStepFour = ({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) => {
	
		const fetchUpdateApi = (state) => {
			updateProduct(dataProduct.id, {['state']: state})
				.then((result) => {
					openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
					console.log(result);
				})
				.catch((err) => {
					openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
					console.log(err);
				});
		};
		const onSubmitConfirm = (state) => {
			confirm({
				title: 'Xác nhận cập nhật bài viết !',
				icon: <ExclamationCircleFilled />,
				content: 'Thay đổi trạng thái bài viết của bạn ! Tuyệt vời ...',
				onOk() {
					fetchUpdateApi(state);
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
					<Badge key={1} dot={dataProduct.state == PRODUCT_PUBLISHED.DRAFT}>
						<Button
							onClick={() => {
								onSubmitConfirm(PRODUCT_PUBLISHED.DRAFT);
							}}
							type='primary'
							className='bg-slate-400'
							key='console'>
							<MehOutlined />
							BẢN NHÁP
						</Button>
					</Badge>,
					<Badge key={1} dot={dataProduct.state == PRODUCT_PUBLISHED.NORMAL}>
						<Button
							onClick={() => {
								onSubmitConfirm(PRODUCT_PUBLISHED.NORMAL);
							}}
							type='primary'
							key='buy'>
							CÔNG KHAI
							<SmileOutlined />
						</Button>
					</Badge>,
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
export default UpdateStepFour;

UpdateStepFour.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
