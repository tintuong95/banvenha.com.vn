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
	DatePicker,
} from 'antd';
import {
	SearchOutlined,
	DownCircleOutlined,
	ClearOutlined,
	FileExcelOutlined,
	PrinterOutlined,
	LoadingOutlined,
	ProjectOutlined,
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {useMitt} from 'react-mitt';
import {
	getPaymentListApi,
	removePaymentById,
	restorePaymentById,
} from '../../../apis/payment';
import {NOTIFICATION_TYPE, PAYMENT_STATUS} from '../../../contants/table';
import {useNavigate} from 'react-router-dom';

const {confirm} = Modal;

const PaymentList = () => {
	const {emitter} = useMitt();
	const navigate = useNavigate();

	const [visible, setVisible] = useState(true);
	const [paymentList, setPaymentList] = useState([]);

	const [params, setParams] = useState({
		currentPage: 1,
		perPage: 10,
		code: null,
		name: null,
		start: null,
		end: null,
		bank_transaction:null
	});
	const columns = [
		{
			title: '#',
			dataIndex: 'id',
			key: 'id',
			render: (text) => text,
		},

		// {
		// 	title: 'Đối tács',
		// 	dataIndex: 'partner',
		// 	key: 'partner',
		// },
		{
			title: 'Tài khoản',
			dataIndex: 'bankName',
			key: 'bankName',
			render: (_, record) => {
				return (
					<div className='flex flex-col '>
						<span className='text-slate-400'>{record.bankName}</span>
						<span className=''>{record.bankNumber}</span>
					</div>
				);
			},
		},
		{
			title: 'Mã giao dịch',
			dataIndex: 'bankTransaction',
			key: 'bankTransaction',
		},
		{
			title: 'Số tiền',
			dataIndex: 'value',
			key: 'value',
			render: (text) => (
				<div className='text-rose-600 '>{text.toLocaleString('vi-VN')} VND</div>
			),
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
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (text) => moment(text).format('hh:mm DD/MM/YYYY '),
		},
		// {
		// 	title: 'Thao tác',
		// 	key: 'action',
		// 	render: (_, record) => (
		// 		<Space size='middle'>
		// 			{record.deleted_at ? (
		// 				<Button
		// 					onClick={() => onRestoreConfirm(record.id)}
		// 					type='primary'
		// 					className='bg-slate-300 text-slate-800'
		// 					icon={<RollbackOutlined />}>
		// 					Restore
		// 				</Button>
		// 			) : (
		// 				<Button
		// 					onClick={() => onRemoveConfirm(record.id)}
		// 					type='primary'
		// 					danger
		// 					icon={<DeleteOutlined />}>
		// 					Delete
		// 				</Button>
		// 			)}
		// 		</Space>
		// 	),
		// },
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

	// const fetchPaymentRemove = (id) => {
	// 	removePaymentById(id)
	// 		.then((result) => {
	// 			fetchPaymentList(params);
	// 			openNotification(NOTIFICATION_TYPE.success, 'Đã xóa thành công !');
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
	// 		});
	// };

	// const fetchPaymentReStore = (id) => {
	// 	restorePaymentById(id)
	// 		.then((result) => {
	// 			fetchPaymentList(params);
	// 			openNotification(NOTIFICATION_TYPE.success, 'Phục hồi thành công !');
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			openNotification(NOTIFICATION_TYPE.error, 'Phục hồi thất bại !');
	// 		});
	// };

	const onChange = (pageNumber) => {
		setParams({...params, currentPage: pageNumber});
	};

	const onChangeForm = (e) => {
		const {name, value} = e.target;
		setParams({...params, [name]: value});
	};

	// const onRemoveConfirm = (id) => {
	// 	confirm({
	// 		title: 'Vui lòng xác nhận xóa !',
	// 		icon: <ExclamationCircleFilled />,
	// 		content: '',
	// 		onOk() {
	// 			fetchPaymentRemove(id);
	// 		},
	// 		onCancel() {
	// 			console.log('Cancel');
	// 		},
	// 	});
	// };

	// const onRestoreConfirm = (id) => {
	// 	confirm({
	// 		title: 'Vui lòng xác nhận phục hồi !',
	// 		icon: <ExclamationCircleFilled />,
	// 		content: '',
	// 		onOk() {
	// 			fetchPaymentReStore(id);
	// 		},
	// 		onCancel() {
	// 			console.log('Cancel');
	// 		},
	// 	});
	// };

	// const openNotification = (type, message, description) => {
	// 	notification[type]({
	// 		type,
	// 		message,
	// 		description,
	// 		onClick: () => {
	// 			console.log('Notification Clicked!');
	// 		},
	// 	});
	// };

	useEffect(() => {
		fetchPaymentList(params);
	}, [params.currentPage]);
	return (
		<>
			<div className='flex gap-4 mb-5 items-center'>
				Mã :
				<Input
					name='code'
					style={{
						width: 200,
					}}
					value={params.code}
					placeholder='Vui lòng nhập'
					onChange={onChangeForm}
				/>
				Mã giao dịch :
				<Input
					name='bank_transaction'
					style={{
						width: 200,
					}}
					value={params.bank_transaction}
					placeholder='Vui lòng nhập '
					onChange={onChangeForm}
				/>
				Số tài khoản :
				<Input
					name='bank_number'
					value={params.bank_number}
					style={{
						width: 200,
					}}
					placeholder='Vui lòng nhập'
					onChange={onChangeForm}
				/>
				{!visible && (
					<div className='flex gap-2 items-center'>
						Bắt đầu :
						<DatePicker
							value={params.start}
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
							value={params.end}
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
				<Button
					onClick={() => {
						fetchPaymentList(params);
					}}
					type='primary'
					icon={<SearchOutlined />}>
					Tìm kiếm
				</Button>
				<Button
					onClick={() => {
						setParams({
							...params,
							code: null,
							bank_number: null,
							bank_transaction: null,
							start: null,
							end: null,
						});
					}}
					type='link'
					icon={<ClearOutlined />}>
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
				onRow={(record, rowIndex) => ({
					onClick: (event) => {
						navigate(`/payment/${record.id}/details`);
					}, // click row
				})}
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
