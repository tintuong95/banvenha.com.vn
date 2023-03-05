import {
	Button,
	Input,
	Pagination,
	Select,
	Space,
	Switch,
	Table,
	Tag,
	Tooltip,
	Modal,
	notification,
	DatePicker,
	QRCode,
} from 'antd';
import ButtonAdd from '../../../components/button-add';
import {
	SearchOutlined,
	DeleteOutlined,
	UnlockOutlined,
	MessageOutlined,
	EyeOutlined,
	LikeOutlined,
	ClearOutlined,
	ExclamationCircleFilled,
	ClockCircleOutlined,
	DownCircleOutlined,
	LockOutlined,
	ProjectOutlined,
	RollbackOutlined,
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {
	BLOG_PUBLISHED,
	BLOG_PUBLISHED_TEXT,
	BLOG_STATUS,
	BLOG_STATUS_TEXT,
	BLOG_STATUS_UPDATE_TEXT,
	NOTIFICATION_TYPE,
} from '../../../contants/table';

import BaseAvatar from '../../../components/avatar';
import {
	getBlogGroupApi,
	getBlogListApi,
	removeBlogById,
	restoreBlogById,
	updateBlogStatusByAdmin,
} from '../../../apis/news';
import {useMitt} from 'react-mitt';

const {confirm} = Modal;

const NewsList = () => {
	const [newsList, setNewsList] = useState([]);
	const [newsGroupList, setNewsGroupList] = useState([]);
	const {emitter} = useMitt();
	const [visible, setVisible] = useState(true);
	const [params, setParams] = useState({
		currentPage: 1,
		perPage: 10,
		name: null,
		status: null,
		state: null,
		group_id: null,
	});

	const fetchNewsList = (params) => {
		emitter.emit('pendingOn');
		getBlogListApi(params)
			.then((result) => {
				setNewsList(result.data);
				emitter.emit('pendingOff');
			})
			.catch((err) => {
				console.log(err);
				emitter.emit('pendingOff');
			});
	};

	const fetchNewsGroupList = () => {
		getBlogGroupApi()
			.then((result) => setNewsGroupList(result.data))
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchNewsRemove = (id) => {
		removeBlogById(id)
			.then((result) => {
				console.log(result);
				openNotification(NOTIFICATION_TYPE.success, 'Đã xóa thành công !');
				fetchNewsList(params);
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
			});
	};

	const fetchNewsRestore = (id) => {
		restoreBlogById(id)
			.then((result) => {
				console.log(result);

				openNotification(NOTIFICATION_TYPE.success, 'Đã xóa thành công !');
				fetchNewsList(params);
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
			});
	};

	const fetchNewsUpdateStatus = (id, status) => {
		updateBlogStatusByAdmin(id, status)
			.then((result) => {
				console.log(result);
				fetchNewsList(params);
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
			});
	};

	const onChange = (pageNumber) => {
		setParams({...params, currentPage: pageNumber});
	};

	const onRemoveConfirm = (id) => {
		confirm({
			title: 'Vui lòng xác nhận xóa !',
			icon: <ExclamationCircleFilled />,
			content: 'Không thể khôi phục lại sau khi xóa.',
			onOk() {
				fetchNewsRemove(id);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	const onRestoreConfirm = (id) => {
		confirm({
			title: 'Vui lòng xác nhận khôi phục !',
			icon: <ExclamationCircleFilled />,
			content: 'Bạn đồng ý khôi phục lại bài viết này.',
			onOk() {
				fetchNewsRestore(id);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	const onUpdateStatusConfirm = (id, status) => {
		confirm({
			title: 'Vui lòng xác nhận thay đổi !',
			icon: <ExclamationCircleFilled />,
			content: '',
			onOk() {
				fetchNewsUpdateStatus(id, status);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	const openNotification = (type, message, description) => {
		notification[type]({
			type,
			message,
			description,
			onClick: () => {
				console.log('Notification Clicked!');
			},
		});
	};

	const newsGroupOptions = () =>
		newsGroupList.map((item) => ({
			label: item.tilte,
			value: item.id,
		}));

	useEffect(() => {
		fetchNewsList(params);
	}, [params.currentPage]);

	useEffect(() => {
		fetchNewsGroupList();
	}, []);

	const columns = [
		{
			title: 'Mã',
			dataIndex: 'id',
			key: 'id',
		},

		{
			title: 'Tên',
			dataIndex: 'title',
			key: 'title',
			render: (_, record) => {
				return (
					<div className='flex flex-col'>
						<span className='font-semibold w-64'>{record.title}</span>
						<div className='text-sm'>
							{/* <span className='text-slate-500'>{record.id}</span> - */}
							<a href='#d' className='text-slate-500'>
								{record.account.fullName}
							</a>
						</div>
					</div>
				);
			},
		},
		{
			title: 'Hình',
			dataIndex: 'photo',
			key: 'photo',
			render: (text) => <BaseAvatar src={text} />,
		},
		{
			title: 'Nhóm',
			dataIndex: 'blog_group.name',
			key: 'blog_group.name',
			render: (_, record) => record.blog_group.title,
		},
		// {
		// 	title: 'Tổng quan',
		// 	dataIndex: 'views',
		// 	key: 'views',
		// 	render: (_, record) => {
		// 		return (
		// 			<div className='flex gap-3'>
		// 				<div className='flex gap-1 items-center'>
		// 					<EyeOutlined style={{color: 'gray'}} />
		// 					{record.views}
		// 				</div>
		// 				<div className='flex gap-1 items-center'>
		// 					<LikeOutlined style={{color: 'blue'}} />
		// 					{record.views}
		// 				</div>
		// 			</div>
		// 		);
		// 	},
		// },

		{
			title: 'Tình trạng',
			key: 'published',
			dataIndex: 'published',
			render: (text) => (
				<Switch
					checkedChildren='NORMAL'
					unCheckedChildren='DRAFT'
					defaultChecked={text === BLOG_PUBLISHED.NORMAL}
					disabled={true}
				/>
			),
		},
		{
			title: '#',
			dataIndex: 'id',
			key: 'id',
			render: () => <QRCode size={60} value='https://ant.design/' />,
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',

			render: (text, record) => {
				if (record.deleted_at)
					return (
						<Button
							size='small'
							className='border-gray-500 bg-gray-400 text-white'
							icon={<DeleteOutlined style={{color: 'white'}} />}>
							Deleted
						</Button>
					);
				else if (text == BLOG_STATUS.PROCESS)
					return (
						<Button
							size='small'
							className='border-sky-500 bg-sky-400 text-white'
							icon={<ClockCircleOutlined spin={180} style={{color: 'white'}} />}>
							{BLOG_STATUS_TEXT[BLOG_STATUS.PROCESS]}
						</Button>
					);
				else if (text == BLOG_STATUS.ACTIVED)
					return (
						<Button
							size='small'
							className='border-green-500 bg-green-400 text-white'
							icon={<DownCircleOutlined style={{color: 'white'}} />}>
							{BLOG_STATUS_TEXT[BLOG_STATUS.ACTIVED]}
						</Button>
					);
				else if (text == BLOG_STATUS.BLOCKED)
					return (
						<Button
							size='small'
							className='border-red-500 bg-red-400 text-white'
							icon={<LockOutlined style={{color: 'white'}} />}>
							{BLOG_STATUS_TEXT[BLOG_STATUS.BLOCKED]}
						</Button>
					);
			},
		},
		{
			title: 'Thời gian',
			key: 'updatedAt',
			dataIndex: 'updatedAt',
			render: (text) => moment(text).format('hh:mm DD/MM/YYYY '),
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					{/* <Tooltip placement='top' title={'Gửi tin nhắn'}>
						<Button type='link' icon={<MessageOutlined />}></Button>
					</Tooltip> */}
					<Tooltip placement='top' title={BLOG_STATUS_UPDATE_TEXT[record.status]}>
						<Button
							onClick={() => {
								onUpdateStatusConfirm(record.id, 2);
							}}
							type='text'
							icon={<UnlockOutlined />}></Button>
					</Tooltip>
					{record?.deleted_at ? (
						<Tooltip placement='top' title={'Khôi phục '}>
							<Button
								onClick={() => {
									onRestoreConfirm(record.id);
								}}
								type='link'
								icon={<RollbackOutlined />}></Button>
						</Tooltip>
					) : (
						<Tooltip placement='top' title={'Xóa sản phẩm'}>
							<Button
								onClick={() => {
									onRemoveConfirm(record.id);
								}}
								type='link'
								danger
								icon={<DeleteOutlined />}></Button>
						</Tooltip>
					)}
					{/* <Button type='link' danger icon={<DeleteOutlined />}></Button> */}
				</Space>
			),
		},
	];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			if (selectedRows.length > 0) {
				jQuery('#list-action').fadeIn(500);
			} else {
				jQuery('#list-action').hide();
			}
		},
	};

	return (
		<>
			<div className='flex flex-wrap gap-4 mb-5 items-center'>
				Tên :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Nhập tên '
					value={params.name}
					onChange={(e) => {
						setParams({...params, name: e.target.value});
					}}
				/>
				Nhóm :
				<Select
					placeholder='Vui lòng chọn'
					style={{
						width: 200,
					}}
					onChange={(value) => {
						setParams({...params, group_id: value});
					}}
					value={params.group_id}
					options={newsGroupOptions()}
				/>
				Tình trạng :
				<Select
					placeholder='Vui lòng chọn'
					style={{
						width: 200,
					}}
					onChange={(value) => {
						setParams({...params, state: value});
					}}
					value={params.state}
					options={[
						{
							value: BLOG_PUBLISHED.DRAFT,
							label: BLOG_PUBLISHED_TEXT[BLOG_PUBLISHED.DRAFT],
						},
						{
							value: BLOG_PUBLISHED.NORMAL,
							label: BLOG_PUBLISHED_TEXT[BLOG_PUBLISHED.NORMAL],
						},
					]}
				/>
				Trạng thái :
				<Select
					placeholder='Vui lòng chọn'
					style={{
						width: 200,
					}}
					onChange={(value) => {
						setParams({...params, status: value});
						console.log(params);
					}}
					value={params.status}
					options={[
						{
							value: BLOG_STATUS.BLOCKED,
							label: BLOG_STATUS_TEXT[BLOG_STATUS.BLOCKED],
						},
						{
							value: BLOG_STATUS.ACTIVED,
							label: BLOG_STATUS_TEXT[BLOG_STATUS.ACTIVED],
						},
						{
							value: BLOG_STATUS.PROCESS,
							label: BLOG_STATUS_TEXT[BLOG_STATUS.PROCESS],
						},
					]}
				/>
				{!visible && (
					<div className='flex gap-2 items-center'>
						Bắt đầu :
						<DatePicker
							style={{
								width: 200,
							}}
							onChange={onChange}
						/>
					</div>
				)}
				{!visible && (
					<div className='flex gap-2 items-center'>
						Kết thúc :
						<DatePicker
							style={{
								width: 200,
							}}
							onChange={onChange}
						/>
					</div>
				)}
				<Button
					onClick={() => setVisible(!visible)}
					type='link'
					ghost
					icon={<ProjectOutlined />}></Button>
				<Button
					onClick={() => {
						fetchNewsList(params);
					}}
					type='primary'
					icon={<SearchOutlined />}>
					Tìm kiếm
				</Button>
				<Button
					onClick={() => {
						setParams({
							...params,
							group_id: null,
							name: null,
							state: null,
							status: null,
						});
					}}
					type='link'
					icon={<ClearOutlined />}>
					Clear
				</Button>
			</div>
			<div className='hidden-cover mb-4' id='list-action'>
				<div className='flex gap-4'>
					<Button type='link' icon={<DeleteOutlined />}>
						Xóa nhiều
					</Button>
					<Button type='link' icon={<UnlockOutlined />}>
						Mở khóa
					</Button>
					<Button type='link' icon={<MessageOutlined />}>
						Gửi tin nhắn
					</Button>
				</div>
			</div>
			<Table
				rowSelection={{
					...rowSelection,
				}}
				pagination={false}
				columns={columns}
				dataSource={newsList?.data}
			/>
			<div className='my-5'>
				<Pagination
					showQuickJumper
					defaultCurrent={1}
					pageSize={params?.perPage}
					total={newsList?.meta?.total}
					onChange={onChange}
				/>
			</div>
			{/* <ButtonAdd to={'/news/create'} /> */}
		</>
	);
};
export default NewsList;
