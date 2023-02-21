import {
	Avatar,
	Button,
	Input,
	Pagination,
	Select,
	Space,
	Switch,
	Table,
	Tag,
	Tooltip,
	notification,
	Modal,
	DatePicker,
	QRCode,
} from 'antd';
import AddButton from '../../../components/AddButton';
import {
	SearchOutlined,
	DeleteOutlined,
	UnlockOutlined,
	MessageOutlined,
	EyeOutlined,
	LikeOutlined,
	ShoppingCartOutlined,
	ClearOutlined,
	ExclamationCircleFilled,
	ClockCircleOutlined,
	DownCircleOutlined,
	LockOutlined,
	ProjectOutlined,
	RollbackOutlined,
} from '@ant-design/icons';
import {useMitt} from 'react-mitt';
import {useEffect, useState} from 'react';
import {
	getProductGroupApi,
	getProductListApi,
	removeProductById,
	restoreProductById,
	updateProductStatusByAdmin,
} from '../../../apis/product';
import {
	NOTIFICATION_TYPE,
	PRODUCT_STATE,
	PRODUCT_STATE_TEXT,
	PRODUCT_STATUS,
	PRODUCT_STATUS_TEXT,
	PRODUCT_STATUS_UPDATE_TEXT,
} from '../../../contants/table';
import BaseAvatar from '../../../components/BaseAvatar';

const {confirm} = Modal;
const ProductList = () => {
	const [visible, setVisible] = useState(true);
	const [productList, setProductList] = useState([]);
	const [productGroupList, setProductGroupList] = useState([]);
	const {emitter} = useMitt();
	const [params, setParams] = useState({
		currentPage: 1,
		perPage: 10,
		name: null,
		status: null,
		state: null,
		group_id: null,
		start: null,
		end: null,
	});

	const columns = [
		{
			title: 'Mã',
			dataIndex: 'qrcode',
			key: 'qrcode',
			render: () => <QRCode size={60} value='https://ant.design/' />,
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
							{/* <span className='text-slate-500'>{record.code}</span> - */}
							<a href='#d' className='text-slate-500'>
								{record.admin.name}
							</a>
						</div>
					</div>
				);
			},
		},
		{
			title: 'Hình',
			dataIndex: 'image',
			key: 'image',
			render: (text) => <BaseAvatar src={text} />,
		},
		{
			title: 'Nhóm',
			dataIndex: 'news_group.name',
			key: 'news_group.name',
			render: (_, record) => record.group_product.name,
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
							{record.likes}
						</div>
						<div className='flex gap-1 items-center'>
							<ShoppingCartOutlined style={{color: 'green'}} />
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
			render: (text) => (
				<Switch
					checkedChildren='NORMAL'
					unCheckedChildren='DRAFT'
					defaultChecked={text === PRODUCT_STATE.NORMAL}
					disabled={true}
				/>
			),
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
				else if (text == PRODUCT_STATUS.PROCESS)
					return (
						<Button
							size='small'
							className='border-sky-500 bg-sky-400 text-white'
							icon={<ClockCircleOutlined style={{color: 'white'}} />}>
							{PRODUCT_STATUS_TEXT[PRODUCT_STATUS.PROCESS]}
						</Button>
					);
				else if (text == PRODUCT_STATUS.ACTIVED)
					return (
						<Button
							size='small'
							className='border-green-500 bg-green-400 text-white'
							icon={<DownCircleOutlined style={{color: 'white'}} />}>
							{PRODUCT_STATUS_TEXT[PRODUCT_STATUS.ACTIVED]}
						</Button>
					);
				else if (text == PRODUCT_STATUS.BLOCKED);
				return (
					<Button
						size='small'
						className='border-red-500 bg-red-400 text-white'
						icon={<LockOutlined style={{color: 'white'}} />}>
						{PRODUCT_STATUS_TEXT[PRODUCT_STATUS.BLOCKED]}
					</Button>
				);
			},
		},

		{
			title: 'Thời gian',
			key: 'updated_at',
			dataIndex: 'updated_at',
			render: (text) => moment(text).format('hh:mm DD-MM-YYYY '),
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					{/* <Tooltip placement='top' title={'Gửi tin nhắn'}>
						<Button type='link' icon={<MessageOutlined />}></Button>
					</Tooltip> */}
					<Tooltip placement='top' title={PRODUCT_STATUS_UPDATE_TEXT[record.status]}>
						<Button
							onClick={() => {
								onUpdateStatusConfirm(record.id, 2);
							}}
							type='text'
							icon={<UnlockOutlined />}></Button>
					</Tooltip>
					{record.deleted_at ? (
						<Tooltip placement='top' title={'Khôi phục'}>
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

	const fetchProductList = (params) => {
		emitter.emit('pendingOn');
		getProductListApi(params)
			.then((result) => {
				setProductList(result.data);
				emitter.emit('pendingOff');
			})
			.catch((err) => {
				console.log(err);
				emitter.emit('pendingOff');
			});
	};

	const fetchProductGroupList = () => {
		getProductGroupApi()
			.then((result) => setProductGroupList(result.data))
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchProductRemove = (id) => {
		removeProductById(id)
			.then((result) => {
				console.log(result);
				openNotification(NOTIFICATION_TYPE.success, 'Đã xóa thành công !');
				fetchProductList(params);
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
			});
	};

	const fetchProductRestore = (id) => {
		restoreProductById(id)
			.then((result) => {
				console.log(result);
				openNotification(NOTIFICATION_TYPE.success, 'Đã khôi phục thành công !');
				fetchProductList(params);
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Khôi phục thất bại !');
			});
	};

	const fetchNewsUpdateStatus = (id, status) => {
		updateProductStatusByAdmin(id, status)
			.then((result) => {
				console.log(result);
				fetchProductList(params);
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
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

	const onChange = (pageNumber) => {
		setParams({...params, currentPage: pageNumber});
	};

	const onRemoveConfirm = (id) => {
		confirm({
			title: 'Vui lòng xác nhận xóa !',
			icon: <ExclamationCircleFilled />,
			content: 'Bạn chắc chắn muốn xóa bài viết này !',
			onOk() {
				fetchProductRemove(id);
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
			content: 'Bạn chắc chắn muốn khôi phục bài viết này !',
			onOk() {
				fetchProductRestore(id);
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

	const productGroupOptions = () =>
		productGroupList.map((item) => ({
			label: item.name,
			value: item.id,
		}));

	useEffect(() => {
		fetchProductList(params);
	}, [params.currentPage]);

	useEffect(() => {
		fetchProductGroupList();
	}, []);

	return (
		<>
			<div className='flex flex-wrap gap-4 mb-5 items-center'>
				Tên :
				<Input
					style={{
						width: 200,
					}}
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
					options={productGroupOptions()}
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
							value: PRODUCT_STATE.DRAFT,
							label: PRODUCT_STATE_TEXT[PRODUCT_STATE.DRAFT],
						},
						{
							value: PRODUCT_STATE.NORMAL,
							label: PRODUCT_STATE_TEXT[PRODUCT_STATE.NORMAL],
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
							value: PRODUCT_STATUS.BLOCKED,
							label: PRODUCT_STATUS_TEXT[PRODUCT_STATUS.BLOCKED],
						},
						{
							value: PRODUCT_STATUS.ACTIVED,
							label: PRODUCT_STATUS_TEXT[PRODUCT_STATUS.ACTIVED],
						},
						{
							value: PRODUCT_STATUS.PROCESS,
							label: PRODUCT_STATUS_TEXT[PRODUCT_STATUS.PROCESS],
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
				<Button
					onClick={() => {
						fetchProductList(params);
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
							start: null,
							end: null,
						});
					}}
					type='link'
					icon={<ClearOutlined />}>
					Clear
				</Button>
			</div>
			<div className='hidden-cover mb-4 ' id='list-action'>
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
				dataSource={productList?.data}
			/>
			<div className='my-5'>
				<Pagination
					showQuickJumper
					defaultCurrent={1}
					pageSize={params?.perPage}
					total={productList?.meta?.total}
					onChange={onChange}
				/>
			</div>
			{/* <AddButton to={'/product/create'} /> */}
		</>
	);
};
export default ProductList;
