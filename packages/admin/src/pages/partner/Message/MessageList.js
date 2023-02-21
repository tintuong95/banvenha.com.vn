import {
	Avatar,
	Button,
	Input,
	message,
	notification,
	Pagination,
	Space,
	Table,
	Tag,
	Modal,
	DatePicker,
} from 'antd';
import {
	SearchOutlined,
	ClearOutlined,
	EyeOutlined,
	DeleteOutlined,
	MailOutlined,
	ExclamationCircleFilled,
	RollbackOutlined,
	ProjectOutlined,
	ClockCircleOutlined,
	DownCircleOutlined,
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {useMitt} from 'react-mitt';
import {
	getMessageListApi,
	removeMessageById,
	restoreMessageById,
} from '../../../apis/message';
import {restoreRestoreById} from '../../../apis/order';
import {MESSAGE_STATUS, NOTIFICATION_TYPE} from '../../../contants/table';

import ModalMessage from './components/ModalMessage';
const {confirm} = Modal;
const MessageList = () => {
	const {emitter} = useMitt();
	const [visible, setVisible] = useState(true);
	const [visibleModal, setVisibleModal] = useState(false);
	const [dataModal, setDataModal] = useState({});
	const [messageList, setMessageList] = useState([]);
	const [params, setParams] = useState({
		currentPage: 1,
		perPage: 10,
		code: null,
		name: null,
	});

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			if (selectedRows.length > 0) {
				jQuery('#list-action').fadeIn(500);
			} else {
				jQuery('#list-action').hide();
			}
		},
	};

	const columns = [
		{
			title: '',
			dataIndex: 'code',
			key: 'code',
			render: () => <Avatar shape='square' icon={<MailOutlined />} />,
		},
		{
			title: 'Mã',
			dataIndex: 'code',
			key: 'code',
		},
		{
			title: 'Tiêu đề',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Người nhắn',
			dataIndex: 'sender',
			key: 'sender',
			render: (_, record) => {
				return (
					<div className='flex flex-col '>
						<span className=''>{record.sender.name}</span>
						<span className='text-slate-400'>{record.sender.email}</span>
					</div>
				);
			},
		},

		// {
		// 	title: 'Đối tács',
		// 	dataIndex: 'partner',
		// 	key: 'partner',
		// },

		{
			title: 'Thời gian',
			dataIndex: 'updated_at',
			key: 'updated_at',
			render: (text) => moment(text).format('hh:mm DD/MM/YYYY '),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (text) => {
				if (text == MESSAGE_STATUS.WATCHED) {
					return (
						<Button
							size='small'
							className='border-sky-500 bg-sky-400 text-white'
							icon={<ClockCircleOutlined style={{color: 'white'}} />}>
							Chưa xem
						</Button>
					);
				} else {
					return (
						<Button
							size='small'
							className='border-green-500 bg-green-400 text-white'
							icon={<DownCircleOutlined style={{color: 'white'}} />}>
							Đã xem
						</Button>
					);
				}
			},
		},
		{
			title: 'Thao tác',
			key: 'action',
			onCell: (record) => ({
				onClick: (event) => event.stopPropagation(),
			}),
			render: (_, record) => (
				<Space size='middle'>
					{record.deleted_at ? (
						<Button
							onClick={() => onRestoreConfirm(record.id)}
							type='primary'
							className='bg-slate-300 text-slate-800'
							icon={<RollbackOutlined />}>
							Restore
						</Button>
					) : (
						<Button
							onClick={() => onRemoveConfirm(record.id)}
							type='primary'
							danger
							icon={<DeleteOutlined />}></Button>
					)}
				</Space>
			),
		},
	];
	const fetchMessageList = (params) => {
		emitter.emit('pendingOn');
		getMessageListApi(params)
			.then((result) => {
				setMessageList(result.data);
				emitter.emit('pendingOff');
			})
			.catch((err) => {
				console.log(err);
				emitter.emit('pendingOff');
			});
	};

	const fetchMessageRemove = (id) => {
		removeMessageById(id)
			.then((result) => {
				fetchMessageList(params);
				openNotification(NOTIFICATION_TYPE.success, 'Đã xóa thành công !');
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
			});
	};

	const fetchMessageReStore = (id) => {
		restoreMessageById(id)
			.then((result) => {
				fetchMessageList(params);
				openNotification(NOTIFICATION_TYPE.success, 'Phục hồi thành công !');
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Phục hồi thất bại !');
			});
	};

	const onChange = (pageNumber) => {
		setParams({...params, currentPage: pageNumber});
	};

	const onRemoveConfirm = (id) => {
		confirm({
			title: 'Vui lòng xác nhận xóa !',
			icon: <ExclamationCircleFilled />,
			content: '',
			onOk() {
				fetchMessageRemove(id);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	const onRestoreConfirm = (id) => {
		confirm({
			title: 'Vui lòng xác nhận phục hồi !',
			icon: <ExclamationCircleFilled />,
			content: '',
			onOk() {
				fetchMessageReStore(id);
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

	useEffect(() => {
		fetchMessageList(params);
	}, [params.currentPage]);
	return (
		<>
			<ModalMessage
				visibleModal={visibleModal}
				setVisibleModal={setVisibleModal}
				dataModal={dataModal}
			/>
			<div className='flex gap-4 mb-5 items-center'>
				Mã :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Nhập mã '
					value={params.code}
					onChange={(e) => {
						setParams({...params, code: e.target.value});
					}}
				/>
				Tiêu đề :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Nhập tiêu đề '
					value={params.name}
					onChange={(e) => {
						setParams({...params, name: e.target.value});
					}}
				/>
				{!visible && (
					<div className='flex gap-2 items-center'>
						Bắt đầu :<DatePicker onChange={onChange} />
					</div>
				)}
				{!visible && (
					<div className='flex gap-2 items-center'>
						Kết thúc :<DatePicker onChange={onChange} />
					</div>
				)}
				<Button
					onClick={() => setVisible(!visible)}
					type='link'
					ghost
					icon={<ProjectOutlined />}></Button>
				<Button
					onClick={() => {
						fetchMessageList(params);
					}}
					type='primary'
					icon={<SearchOutlined />}>
					Tìm kiếm
				</Button>
				<Button
					onClick={() => {
						setParams({
							...params,
							name: null,
							code: null,
						});
					}}
					type='link'
					icon={<ClearOutlined />}>
					Clear
				</Button>
			</div>
			<div className='hidden-cover mb-4' id='list-action'>
				<div className='flex gap-4'>
					<Button type='link' icon={<EyeOutlined />}>
						Đã xem
					</Button>
					<Button type='link' icon={<DeleteOutlined />}>
						Xóa nhiều
					</Button>
				</div>
			</div>
			<Table
				rowSelection={{
					...rowSelection,
				}}
				onRow={(record, rowIndex) => ({
					onClick: (event) => {
						event.stopPropagation();
						setDataModal(record);
						setVisibleModal(!visibleModal);
					}, // click row
				})}
				pagination={false}
				columns={columns}
				dataSource={messageList?.data?.map((item) => ({...item, key: item.id}))}
			/>
			<div className='my-5'>
				<Pagination
					showQuickJumper
					defaultCurrent={2}
					pageSize={params?.perPage}
					total={messageList?.meta?.total}
					onChange={onChange}
				/>
			</div>
		</>
	);
};
export default MessageList;
