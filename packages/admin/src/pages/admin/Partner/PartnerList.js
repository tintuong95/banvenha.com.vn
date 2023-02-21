import {
	Avatar,
	Button,
	DatePicker,
	Input,
	Modal,
	notification,
	Pagination,
	Select,
	Space,
	Table,
	Tag,
	Tooltip,
} from 'antd';
import {
	SearchOutlined,
	UserOutlined,
	DeleteOutlined,
	UnlockOutlined,
	ClearOutlined,
	ExclamationCircleFilled,
	MessageOutlined,
	ProjectOutlined,
	LockOutlined,
	ClockCircleOutlined,
	RollbackOutlined,
	DownCircleOutlined,
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {useMitt} from 'react-mitt';
import {getAccountListApi, removeAccountById} from '../../../apis/admin';
import {
	NOTIFICATION_TYPE,
	PARTNER_STATUS,
	PARTNER_STATUS_TEXT,
} from '../../../contants/table';
import {restorePaymentById} from '../../../apis/payment';
import ModalMessage from '../Message/components/ModalMessage';

const {confirm} = Modal;

const PartnerList = () => {
	const {emitter} = useMitt();
	const [visible, setVisible] = useState(true);
	const [visibleModal, setVisibleModal] = useState(false);
	const [message,setMessage] = useState({
		title: '',
		content: '',
	});
	const [partnerList, setPartnerList] = useState([]);
	const [params, setParams] = useState({
		currentPage: 1,
		perPage: 2,
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
			title: 'Hình',
			dataIndex: 'avatar',
			key: 'avatar',
			render: () => (
				<Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined />} />
			),
		},
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Phone',
			dataIndex: 'tel',
			key: 'tel',
		},
		{
			title: 'Ngày sinh',
			key: 'birthday',
			dataIndex: 'birthday',
		},
		{
			title: 'Nơi sống',
			key: 'address',
			dataIndex: 'address',
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
				else if (text == PARTNER_STATUS.process)
					return (
						<Button
							size='small'
							className='border-sky-500 bg-sky-400 text-white'
							icon={<ClockCircleOutlined spin={180} style={{color: 'white'}} />}>
							{PARTNER_STATUS_TEXT[PARTNER_STATUS.process]}
						</Button>
					);
				else if (text == PARTNER_STATUS.actived)
					return (
						<Button
							size='small'
							className='border-green-500 bg-green-400 text-white'
							icon={<DownCircleOutlined style={{color: 'white'}} />}>
							{PARTNER_STATUS_TEXT[PARTNER_STATUS.actived]}
						</Button>
					);
				else if (text == PARTNER_STATUS.blocked)
					return (
						<Button
							size='small'
							className='border-red-500 bg-red-400 text-white'
							icon={<LockOutlined style={{color: 'white'}} />}>
							{PARTNER_STATUS_TEXT[PARTNER_STATUS.blocked]}
						</Button>
					);
			},
		},
		{
			title: 'Ngày tạo',
			key: 'created_at',
			dataIndex: 'created_at',
			render: (text) => moment(text).format('hh:mm DD/MM/YYYY '),
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Tooltip placement='top' title={'Gửi tin nhắn'}>
						<Button onClick={()=>{setVisibleModal(true)}} type='link' icon={<MessageOutlined />}></Button>
					</Tooltip>
					<Tooltip placement='top' title={'Khóa sản phẩm'}>
						<Button type='text' icon={<UnlockOutlined />}></Button>
					</Tooltip>
					{record?.deleted_at ? (
						<Tooltip placement='top' title={'Xóa sản phẩm'}>
							<Button
								onClick={() => {
									onRemoveConfirm(record.id);
								}}
								type='link'
								icon={<RollbackOutlined />}></Button>
						</Tooltip>
					) : (
						<Tooltip placement='top' title={'Khôi phục'}>
							<Button
								onClick={() => {
									onRestoreConfirm(record.id);
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

	const fetchPartnerList = (params) => {
		emitter.emit('pendingOn');
		getAccountListApi(params)
			.then((result) => {
				setPartnerList(result.data);
				emitter.emit('pendingOff');
			})
			.catch((err) => {
				console.log(err);
				emitter.emit('pendingOff');
			});
	};

	const fetchPartnerRemove = (id) => {
		removeAccountById(id)
			.then((result) => {
				fetchPartnerList(params);
				openNotification(NOTIFICATION_TYPE.success, 'Đã xóa thành công !');
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
			});
	};

	const fetchPartnerReStore = (id) => {
		restorePaymentById(id)
			.then((result) => {
				fetchPartnerList(params);
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
				fetchPartnerRemove(id);
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
				fetchPartnerReStore(id);
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
		fetchPartnerList(params);
	}, [params.currentPage]);

	return (
		<>
			<ModalMessage
				visibleModal={visibleModal}
				setVisibleModal={setVisibleModal}
				dataModal={message}
				setDataModal={setMessage}
			/>
			<div className='flex flex-wrap gap-4 mb-5 items-center'>
				Tên :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Vui lòng nhập'
				/>
				Phone :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Vui lòng nhập'
				/>
				Tỉnh :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Vui lòng nhập'
				/>
				Trạng thái :
				<Select
					placeholder='Vui lòng chọn'
					style={{
						width: 200,
					}}
					onChange={(value) => {
						setParams({...params, status: value});
					}}
					value={params.status}
					options={[
						{
							value: PARTNER_STATUS.process,
							label: PARTNER_STATUS_TEXT[PARTNER_STATUS.process],
						},
						{
							value: PARTNER_STATUS.actived,
							label: PARTNER_STATUS_TEXT[PARTNER_STATUS.actived],
						},
						{
							value: PARTNER_STATUS.blocked,
							label: PARTNER_STATUS_TEXT[PARTNER_STATUS.blocked],
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
							onChange={(_, dateString) => {
								setParams({...params, start: dateString});
							}}
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
							onChange={(_, dateString) => {
								setParams({...params, end: dateString});
							}}
						/>
					</div>
				)}
				<Button
					onClick={() => setVisible(!visible)}
					type='link'
					ghost
					icon={<ProjectOutlined />}></Button>
				<Button type='primary' icon={<SearchOutlined />}>
					Tìm kiếm
				</Button>
				<Button type='link' icon={<ClearOutlined />}>
					Clear
				</Button>
			</div>
			<div className='hidden-cover mb-4' id='list-action'>
				<div className='flex gap-4'>
					<Button>Default Button</Button>
					<Button>Default Button</Button>
					<Button>Default Button</Button>
				</div>
			</div>
			<Table
				rowSelection={{
					...rowSelection,
				}}
				pagination={false}
				columns={columns}
				dataSource={partnerList?.data}
			/>
			<div className='my-5'>
				<Pagination
					showQuickJumper
					defaultCurrent={1}
					pageSize={params?.perPage}
					total={partnerList?.meta?.total}
					onChange={onChange}
				/>
			</div>
		</>
	);
};
export default PartnerList;
