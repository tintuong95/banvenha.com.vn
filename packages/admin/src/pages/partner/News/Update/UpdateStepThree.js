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
import {createBlogApi, updateBlog} from '../../../../apis/news';
import {BLOG_PUBLISHED, NOTIFICATION_TYPE} from '../../../../contants/table';
import {history} from '../../../../routes/history';
import { openNotification } from '../../../../utils/notification';
const {confirm} = Modal;
const CreateStepThree = ({
	stepPage,
	setStepPage,
	onPreviousStep,
	onNextStep,
	dataNews,
	setDataNews,
}) => {
	

	const fetchUpdateApi = (published) => {
		updateBlog(dataNews.id, {['published']: published})
			.then((result) => {
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
				console.log(result);
			})
			.catch((err) => {
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
				console.log(err);
			});
	};
	const onSubmitConfirm = (published) => {
		confirm({
			title: 'Xác nhận cập nhật bài viết !',
			icon: <ExclamationCircleFilled />,
			content: 'Thay đổi trạng thái bài viết của bạn ! Tuyệt vời ...',
			onOk() {
				fetchUpdateApi(published);
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
					<Badge key={1} dot={dataNews.state === BLOG_PUBLISHED.DRAFT}>
						<Button
							onClick={() => {
								if (dataNews.state === BLOG_PUBLISHED.DRAFT) return;
								onSubmitConfirm(BLOG_PUBLISHED.DRAFT);
							}}
							type='primary'
							className='bg-slate-400'
							key='console'>
							<MehOutlined />
							BẢN NHÁP
						</Button>
					</Badge>,
					<Badge key={2} dot={dataNews.state !== BLOG_PUBLISHED.DRAFT}>
						<Button
							onClick={() => {
								if (dataNews.state === BLOG_PUBLISHED.NORMAL) return;
								onSubmitConfirm(BLOG_PUBLISHED.NORMAL);
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
