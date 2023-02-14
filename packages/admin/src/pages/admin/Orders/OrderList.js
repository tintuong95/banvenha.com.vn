import {
	Button,
	Input,
	notification,
	Pagination,
	QRCode,
	Space,
	Table,
	Modal
} from 'antd';
import {
	SearchOutlined,
	DownCircleOutlined,
	ClearOutlined,
	FileExcelOutlined,
	PrinterOutlined,
	ExclamationCircleFilled,
	DeleteOutlined,
	RollbackOutlined,
} from '@ant-design/icons';
import {useMitt} from 'react-mitt';
import {useEffect, useState} from 'react';
import {
	getOrderListApi,
	removeOrderById,
	restoreRestoreById,
} from '../../../apis/order';
import {NOTIFICATION_TYPE} from '../../../contants/table';

const {confirm}=Modal

const OrderList = () => {
	const [orderList, setOrderList] = useState([]);
	const {emitter} = useMitt();
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
			title: 'QRCode',
			dataIndex: 'qrcode',
			key: 'qrcode',
			render: () => <QRCode size={60} value='https://ant.design/' />,
		},
		{
			title: 'Mã',
			dataIndex: 'code',
			key: 'code',
		},
		{
			title: 'Người mua',
			dataIndex: 'name',
			key: 'name',
			render: (_, record) => {
				return (
					<div className='flex flex-col '>
						<span className=''>{record.name}</span>
						<span className='text-slate-400'>{record.email}</span>
					</div>
				);
			},
		},

		{
			title: 'Đối tác',
			dataIndex: 'admin',
			key: 'admin',
			render: (text) => text.name,
		},
		{
			title: 'Sản phẩm',
			dataIndex: 'products',
			key: 'products',
			render: (text) => {
				return (
					<div className='flex flex-col '>
						<span className='text-slate-400'>{text.name}</span>
						<span className=''>{text.price}</span>
					</div>
				);
			},
		},
		{
			title: 'Giá bán',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Thanh toán',
			dataIndex: 'payment',
			key: 'payment',
			render: () => {
				return (
					<div className='w-full text-center'>
						<DownCircleOutlined style={{color: 'green'}} />
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
							icon={<DeleteOutlined />}>
							Delete
						</Button>
					)}
				</Space>
			),
		},
	];

	const fetchOrderList = (params) => {
		emitter.emit('pendingOn');
		getOrderListApi(params)
			.then((result) => {
				setOrderList(result.data);
				emitter.emit('pendingOff');
			})
			.catch((err) => {
				console.log(err);
				emitter.emit('pendingOff');
			});
	};

	const fetchOrderRemove = (id) => {
		removeOrderById(id)
			.then((result) => {
				fetchOrderList(params);
				openNotification(NOTIFICATION_TYPE.success, 'Đã xóa thành công !');
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
			});
	};

	const fetchOrderReStore = (id) => {
		restoreRestoreById(id)
			.then((result) => {
				fetchOrderList(params);
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
				fetchOrderRemove(id);
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
				fetchOrderReStore(id);
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
		fetchOrderList(params);
	}, [params.currentPage]);

	return (
		<>
			<div className='flex gap-4 mb-5 items-center'>
				Mã :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Nhập code '
					value={params.code}
					onChange={(e) => {
						setParams({...params, code: e.target.value});
					}}
				/>
				Người mua :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Nhập tên khách hàng '
					value={params.name}
					onChange={(e) => {
						setParams({...params, name: e.target.value});
					}}
				/>
				{/* Đối tác :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Basic usage'
				/> */}
				<Button
					onClick={() => {
						fetchOrderList(params);
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
							name: null,
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
				pagination={false}
				columns={columns}
				dataSource={orderList?.data}
			/>
			<div className='my-5'>
				<Pagination
					showQuickJumper
					defaultCurrent={1}
					pageSize={params?.perPage}
					total={orderList?.meta?.total}
					onChange={onChange}
				/>
			</div>
		</>
	);
};
export default OrderList;
