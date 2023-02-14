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
} from '@ant-design/icons';
import {useMitt} from 'react-mitt';
import {useEffect, useState} from 'react';
import {
	getProductGroupApi,
	getProductListApi,
	removeProductById,
	updateProductStatusByAdmin,
} from '../../../apis/product';
import {NOTIFICATION_TYPE, PRODUCT_STATE, PRODUCT_STATE_TEXT, PRODUCT_STATUS, PRODUCT_STATUS_TEXT, PRODUCT_STATUS_UPDATE_TEXT} from '../../../contants/table';
import BaseAvatar from '../../../components/BaseAvatar';

const {confirm} = Modal;
const ProductList = () => {
	const [productList, setProductList] = useState([]);
	const [productGroupList, setProductGroupList] = useState([]);
	const {emitter} = useMitt();
	const [params, setParams] = useState({
		currentPage: 1,
		perPage: 2,
		name: null,
		status: null,
		state: null,
		group_id: null,
	});

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
							<span className='text-slate-500'>{record.code}</span> -
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

			render: (text) => {
				if (text == PRODUCT_STATUS.PROCESS)
					return (
						<Tag color={'cyan'} key={'cyan'}>
							{PRODUCT_STATUS_TEXT[PRODUCT_STATUS.PROCESS]}
						</Tag>
					);

				if (text == PRODUCT_STATUS.ACTIVED)
					return (
						<Tag color={'green'} key={'green'}>
							{PRODUCT_STATUS_TEXT[PRODUCT_STATUS.ACTIVED]}
						</Tag>
					);

				if (text == PRODUCT_STATUS.BLOCKED)
					return (
						<Tag color={'volcano'} key={'volcano'}>
							{PRODUCT_STATUS_TEXT[PRODUCT_STATUS.BLOCKED]}
						</Tag>
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
					<Tooltip placement='top' title={'Xóa sản phẩm'}>
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
			})
			.catch((err) => {
				console.log(err);
				openNotification(NOTIFICATION_TYPE.error, 'Xóa thất bại !');
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
			content: 'Không thể khôi phục lại sau khi xóa.',
			onOk() {
				fetchProductRemove(id);
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
			<div className='flex gap-4 mb-5 items-center'>
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
