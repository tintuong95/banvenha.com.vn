import {Badge, Button, Divider, Modal, notification, Result} from 'antd';
import {RobotOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	MehOutlined,
	SmileOutlined,
	ExclamationCircleFilled,
} from '@ant-design/icons';
import {createNewsApi, updateNews} from '../../../../apis/news';
import {NEWS_STATE, NOTIFICATION_TYPE} from '../../../../contants/table';
import {history} from '../../../../routes/history';
const {confirm} = Modal;
const CreateStepThree = ({
	stepPage,
	setStepPage,
	onPreviousStep,
	onNextStep,
	dataNews,
	setDataNews,
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

	const fetchUpdateApi = (state) => {
	
		updateNews(dataNews.id, {['state']: state})
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
					<Badge key={1} dot={dataNews.state === NEWS_STATE.DRAFT}>
						<Button
							onClick={() => {
								if (dataNews.state === NEWS_STATE.DRAFT) return
									onSubmitConfirm(NEWS_STATE.DRAFT);
							}}
							type='primary'
							className='bg-slate-400'
							key='console'>
							<MehOutlined />
							BẢN NHÁP
						</Button>
					</Badge>,
					<Badge key={2} dot={dataNews.state !== NEWS_STATE.DRAFT}>
						<Button
							onClick={() => {
								if (dataNews.state === NEWS_STATE.NORMAL) return;
								onSubmitConfirm(NEWS_STATE.NORMAL);
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
					disabled={stepPage === 3}>
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
	dataNews: PropTypes.object,
	setDataNews: PropTypes.func,
};
