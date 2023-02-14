import {
	Avatar,
	Button,
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
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {useMitt} from 'react-mitt';
import {getAccountListApi, removeAccountById} from '../../../apis/admin';
import {NOTIFICATION_TYPE} from '../../../contants/table';
import {restorePaymentById} from '../../../apis/payment';

const {confirm} = Modal;

const PartnerList = () => {
	const [partnerList, setPartnerList] = useState([]);
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
			render: () => (
				<Tag color={'green'} key={'green'}>
					NORMAL
				</Tag>
			),
		},
		{
			title: 'Ngày tạo',
			key: 'created_at',
			dataIndex: 'created_at',
			render: (text) => moment(text).format('hh:mm DD/MM/YYYY '),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>

					<Tooltip placement='top' title={'Gửi tin nhắn'}>
						<Button type='link' icon={<MessageOutlined />}></Button>
					</Tooltip>
					<Tooltip placement='top' title={'Khóa sản phẩm'}>
						<Button type='text' icon={<UnlockOutlined />}></Button>
					</Tooltip>
					<Tooltip placement='top' title={'Xóa sản phẩm'}>
						<Button type='link' danger icon={<DeleteOutlined />}></Button>
					</Tooltip>
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
			<div className='flex gap-4 mb-5 items-center'>
				Tên :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Basic usage'
				/>
				Phone :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Basic usage'
				/>
				Tỉnh :
				<Select
					defaultValue='lucy'
					style={{
						width: 200,
					}}
					options={[
						{
							value: 'lucy',
							label: 'Lucy',
						},
					]}
				/>
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
