import {
	Button,
	Input,
	notification,
	Pagination,
	QRCode,
	Space,
	Table,
	Tag,
	Modal,
	DatePicker
} from 'antd';
import {
	SearchOutlined,
	DownCircleOutlined,
	ClearOutlined,
	FileExcelOutlined,
	PrinterOutlined,
	ExclamationCircleFilled,
	RollbackOutlined,
	DeleteOutlined,
	ProjectOutlined,
	LoadingOutlined,
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {useMitt} from 'react-mitt';
import {
	getPaymentListApi,
	removePaymentById,
	restorePaymentById,
} from '../../../apis/payment';
import {NOTIFICATION_TYPE, PAYMENT_STATUS} from '../../../contants/table';



const {confirm}=Modal

const PaymentList = () => {
	const [paymentList, setPaymentList] = useState([]);
	const {emitter} = useMitt();
	const [visible, setVisible] = useState(true);
	const [params, setParams] = useState({
		currentPage: 1,
		perPage: 10,
		code: null,
		name: null,
	});
	const columns = [
		{
			title: 'QRCode',
			dataIndex: 'qrcode',
			key: 'qrcode',
			render: () => <QRCode size={60} value='https://ant.design/' />,
		},

		{
			title: 'Người nhận',
			dataIndex: 'amdin',
			key: 'amdin',
			render: (text, record) => {
				return (
					<div className='flex flex-col '>
						<span className=''>{record?.admin?.name}</span>
						<span className='text-slate-400'>{record?.admin?.email}</span>
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
			title: 'Tài khoản',
			dataIndex: 'bank_name',
			key: 'bank_name',
			render: (_, record) => {
				return (
					<div className='flex flex-col '>
						<span className='text-slate-400'>{record.bank_name}</span>
						<span className=''>{record.bank_number}</span>
					</div>
				);
			},
		},
		{
			title: 'Số tiền',
			dataIndex: 'money',
			key: 'money',
			render: (text) => <Tag color='red'>{text}</Tag>,
		},
		{
			title: 'Thanh toán',
			dataIndex: 'status',
			key: 'status',
			render: (text) => {
				return (
					<div className='w-full flex items-center gap-2'>
						{text == PAYMENT_STATUS.success ? (
							<Button
								size='small'
								className='border-green-500 bg-green-400 text-white'
								icon={<DownCircleOutlined style={{color: 'white'}} />}>
								Success
							</Button>
						) : (
							<Button
								size='small'
								className='border-yellow-500 bg-yellow-400 text-white'
								icon={<LoadingOutlined style={{color: 'white'}} />}>
								Pending
							</Button>
						)}
					</div>
				);
			},
		},
		{
			title: 'Thời gian',
			dataIndex: 'updated_at',
			key: 'updated_at',
			render: (text) => moment(text).format('hh:mm DD/MM/YYYY '),
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					{record.deleted_at ? (
						<Button
							onClick={() => onRestoreConfirm(record.id)}
							type='link'
							icon={<RollbackOutlined />}></Button>
					) : (
						<Button
							onClick={() => onRemoveConfirm(record.id)}
							type='link'
							danger
							icon={<DeleteOutlined />}></Button>
					)}
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

	const fetchPaymentList = (params) => {
		emitter.emit('pendingOn');
		getPaymentListApi(params)
			.then((result) => {
				setPaymentList(result.data);
				emitter.emit('pendingOff');
			})
			.catch((err) => {
				console.log(err);
				emitter.emit('pendingOff');
			});
	};

	const fetchPaymentRemove = (id) => {
		removePaymentById(id)
			.then((result) => {
				fetchPaymentList(params);
				openNotification(NOTIFICATION_TYPE.success, 'Đã xóa thành công !');
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
			});
	};

	const fetchPaymentReStore = (id) => {
		restorePaymentById(id)
			.then((result) => {
				fetchPaymentList(params);
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
				fetchPaymentRemove(id);
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
				fetchPaymentReStore(id);
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
		fetchPaymentList(params);
	}, [params.currentPage]);
	return (
		<>
			<div className='flex flex-wrap gap-4 mb-5 items-center'>
				Mã :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Nhập mã'
				/>
				Người nhận :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Tên người nhận'
				/>
				Số tài khoản :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Vui lòng nhập'
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
					<Button type='link' icon={<PrinterOutlined />}>
						In
					</Button>
					<Button type='link' icon={<FileExcelOutlined />}>
						Excel
					</Button>
				</div>
			</div>
			<Table
				rowSelection={{
					...rowSelection,
				}}
				pagination={false}
				columns={columns}
				dataSource={paymentList?.data}
			/>
			<div className='my-5'>
				<Pagination
					showQuickJumper
					defaultCurrent={1}
					pageSize={params?.perPage}
					total={paymentList?.meta?.total}
					onChange={onChange}
				/>
			</div>
		</>
	);
};
export default PaymentList;
