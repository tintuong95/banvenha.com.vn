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
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {axios} from '../../../config/axios';
import moment from 'moment';
import {NEWS_STATUS, NEWS_STATUS_TEXT} from '../../../contants/table';

const columns = [
	{
		title: 'Hình',
		dataIndex: 'image',
		key: 'image',
		render: (text) => (
			<Avatar className='shadow-md' shape='square' size={64} src={text} />
		),
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
							{record.partner}
						</a>
					</div>
				</div>
			);
		},
	},
	{
		title: 'Nhóm',
		dataIndex: 'group',
		key: 'group',
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
		render: () => (
			<Switch
				checkedChildren='NORMAL'
				unCheckedChildren='DRAFT'
				defaultChecked
				disabled={true}
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
		render: (text) => moment(text).format('hh:mm DD-MM-YYYY '),
	},
	{
		title: 'Thao tác',
		key: 'action',
		render: () => (
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

// rowSelection object indicates the need for row selection
const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		if (selectedRows.length > 0) {
			jQuery('#list-action').fadeIn(500);
		} else {
			jQuery('#list-action').hide();
		}
	},
};
const onChange = (pageNumber) => {
	console.log('Page: ', pageNumber);
};

const NewsList = () => {
	const [newsList, setNewsList] = useState([]);

	const fetchNewsList = () => {
		axios('/news/list')
			.then((result) => setNewsList(result.data.items))
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchNewsList();
	}, []);

	console.log(newsList);
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
				Nhóm :
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
				Tình trạng :
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
				Trạng thái :
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
			<div className='mb-5  hidden' id='list-action'>
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
				dataSource={newsList}
			/>
			<div className='my-5'>
				<Pagination
					showQuickJumper
					defaultCurrent={2}
					total={500}
					onChange={onChange}
				/>
			</div>
			<AddButton to={'/news/create'} />
		</>
	);
};
export default NewsList;
