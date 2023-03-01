import {Button, Divider, Modal, notification, Result} from 'antd';
import {RobotOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	MehOutlined,
	SmileOutlined,
	ExclamationCircleFilled,
} from '@ant-design/icons';
import {createNewsApi} from '../../../../apis/news';
import {NEWS_STATE, NOTIFICATION_TYPE} from '../../../../contants/table';
import { history } from '../../../../routes/history';
const {confirm}=Modal
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
	const onSubmit = (state) => {
		const data = new FormData();
		console.log(dataNews);
		data.append('name', dataNews.name);
		data.append('description', dataNews.description);
		data.append('content', dataNews.content);
		data.append('group_id', dataNews.group_id);
		data.append('state', state);
		data.append('image', dataNews.image[0].originFileObj);

		createNewsApi(data)
			.then((result) => {
				history.push("/news")
				openNotification[(NOTIFICATION_TYPE.success, 'Tạo mới thành công !')];
			})
			.catch((err) => {
				openNotification[(NOTIFICATION_TYPE.error, 'Tạo mới thất bại !')];
				console.log(err);
			});
	};
	
	const onRemoveConfirm = (state) => {
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
							onRemoveConfirm(NEWS_STATE.DRAFT);
						}}
						type='primary'
						className='bg-slate-400'
						key='console'>
						<MehOutlined />
						BẢN NHÁP
					</Button>,
					<Button
						onClick={() => {
							onRemoveConfirm(NEWS_STATE.NORMAL);
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
