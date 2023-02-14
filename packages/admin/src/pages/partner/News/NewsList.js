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
} from 'antd';
import AddButton from '../../../components/AddButton';
import {
	SearchOutlined,
	DeleteOutlined,
	UnlockOutlined,
	MessageOutlined,
	EyeOutlined,
	LikeOutlined,
	ClearOutlined,
	ExclamationCircleFilled,
	ToolOutlined,
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {
	NEWS_STATE,
	NEWS_STATE_TEXT,
	NEWS_STATUS,
	NEWS_STATUS_TEXT,
	NOTIFICATION_TYPE,
	NEWS_STATUS_UPDATE_TEXT,
} from '../../../contants/table';

import BaseAvatar from '../../../components/BaseAvatar';
import {
	getNewsGroupApi,
	getNewsListApi,
	removeNewsById,
	updateNewstState,
} from '../../../apis/news';
import {useMitt} from 'react-mitt';
import { useNavigate } from 'react-router-dom';

const {confirm} = Modal;

const NewsList = () => {
	const {emitter} = useMitt();
	const navigate = useNavigate();
	const [newsList, setNewsList] = useState([]);
	const [newsGroupList, setNewsGroupList] = useState([]);

	const [params, setParams] = useState({
		currentPage: 1,
		perPage: 2,
		name: null,
		status: null,
		state: null,
		group_id: null,
	});

	const fetchNewsList = (params) => {
		emitter.emit('pendingOn');
		getNewsListApi(params)
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
		getNewsGroupApi()
			.then((result) => setNewsGroupList(result.data))
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchNewsRemove = (id) => {
		removeNewsById(id)
			.then((result) => {
				console.log(result);
				fetchNewsList(params);
				openNotification(NOTIFICATION_TYPE.success, 'Đã xóa thành công !');
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
			});
	};

	const fetchNewsUpdateState = (id, state) => {
		updateNewstState(id, state)
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

	const onUpdateStateConfirm = (id, state) => {
		confirm({
			title: 'Vui lòng xác nhận thay đổi !',
			icon: <ExclamationCircleFilled />,
			content: '',
			onOk() {
				fetchNewsUpdateState(id, state);
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
			label: item.name,
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
			title: 'Hình',
			dataIndex: 'image',
			key: 'image',
			render: (text) => <BaseAvatar src={text} />,
		},

		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
			render: (_, record) => {
				return (
					<div className='flex flex-col'>
						<span className='font-semibold'>{record.name}</span>
						<div className='text-sm'>
							<span className='text-slate-500'>{record.id}</span> -
							<a href='#d' className='text-slate-500'>
								{record.admin.name}
							</a>
						</div>
					</div>
				);
			},
		},
		{
			title: 'Nhóm',
			dataIndex: 'news_group.name',
			key: 'news_group.name',
			render: (_, record) => record.news_group.name,
		},
		{
			title: 'Tổng quan',
			dataIndex: 'views',
			key: 'views',
			render: (_, record) => {
				return (
					<div className='flex gap-3'>
						<div className='flex gap-1 items-center'>
							<EyeOutlined style={{color: 'gray'}} />
							{record.views}
						</div>
						<div className='flex gap-1 items-center'>
							<LikeOutlined style={{color: 'blue'}} />
							{record.views}
						</div>
					</div>
				);
			},
		},

		{
			title: 'Tình trạng',
			key: 'state',
			dataIndex: 'state',
			render: (text, record) => (
				<Switch
					checkedChildren='NORMAL'
					unCheckedChildren='DRAFT'
					defaultChecked={text === NEWS_STATE.NORMAL}
					onChange={(e) => {
						const state = e ? NEWS_STATE.NORMAL : NEWS_STATE.DRAFT;
						onUpdateStateConfirm(record.id, state);
					}}
					disabled={false}
				/>
			),
		},
		{
			title: 'Trạng thái',
			key: 'status',
			dataIndex: 'status',

			render: (text) => {
				if (text == NEWS_STATUS.PROCESS)
					return (
						<Tag color={'cyan'} key={'cyan'}>
							{NEWS_STATUS_TEXT[NEWS_STATUS.PROCESS]}
						</Tag>
					);

				if (text == NEWS_STATUS.ACTIVED)
					return (
						<Tag color={'green'} key={'green'}>
							{NEWS_STATUS_TEXT[NEWS_STATUS.ACTIVED]}
						</Tag>
					);

				if (text == NEWS_STATUS.BLOCKED)
					return (
						<Tag color={'volcano'} key={'volcano'}>
							{NEWS_STATUS_TEXT[NEWS_STATUS.BLOCKED]}
						</Tag>
					);
			},
		},
		{
			title: 'Thời gian',
			key: 'updated_at',
			dataIndex: 'updated_at',
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
					<Tooltip placement='top' title={'Sửa tin tức'}>
						<Button
							onClick={() => {
								navigate(`/news/${record.id}/update`);
							}}
							type='text'
							icon={<ToolOutlined />}></Button>
					</Tooltip>
					<Tooltip placement='top' title={'Xóa tin tức'}>
						<Button
							onClick={() => {
								onRemoveConfirm(record.id);
							}}
							type='link'
							danger
							icon={<DeleteOutlined />}></Button>
					</Tooltip>
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
			<div className='flex gap-4 mb-5 items-center'>
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
							value: NEWS_STATE.DRAFT,
							label: NEWS_STATE_TEXT[NEWS_STATE.DRAFT],
						},
						{
							value: NEWS_STATE.NORMAL,
							label: NEWS_STATE_TEXT[NEWS_STATE.NORMAL],
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
							value: NEWS_STATUS.BLOCKED,
							label: NEWS_STATUS_TEXT[NEWS_STATUS.BLOCKED],
						},
						{
							value: NEWS_STATUS.ACTIVED,
							label: NEWS_STATUS_TEXT[NEWS_STATUS.ACTIVED],
						},
						{
							value: NEWS_STATUS.PROCESS,
							label: NEWS_STATUS_TEXT[NEWS_STATUS.PROCESS],
						},
					]}
				/>
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
			<AddButton to={'/news/create'} />
		</>
	);
};
export default NewsList;
