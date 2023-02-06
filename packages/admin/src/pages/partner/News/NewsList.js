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
	// UnlockOutlined,
	MessageOutlined,
    EyeOutlined,
	LikeOutlined, ClearOutlined,
	EditOutlined
} from '@ant-design/icons';
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
					<span className='text-slate-500'>{record.code}</span>
					<span className='font-semibold'>{record.name}</span>
				
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
                    <div className='flex gap-1 items-center'><EyeOutlined style={{ color: "gray" }}/>{record.views}</div>
                    <div className='flex gap-1 items-center'><LikeOutlined style={{ color: "blue" }} />{record.views}</div>
                   
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
				disabled={false}
			/>
		),
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
		title: 'Thời gian',
		key: 'updated_at',
		dataIndex: 'updated_at',
	},
	{
		title: 'Thao tác',
		key: 'action',
		render: () => (
			<Space size='middle'>
				<Tooltip placement='top' title={'Gửi tin nhắn'}>
					<Button type='link' icon={<MessageOutlined />}></Button>
				</Tooltip>
				<Tooltip placement='top' title={'Sửa bài viết'}>
					<Button type='link' icon={<EditOutlined />}></Button>
				</Tooltip>
				<Tooltip placement='top' title={'Xóa bài viết'}>
					<Button type='link' danger icon={<DeleteOutlined />}></Button>
				</Tooltip>

				{/* <Button type='link' danger icon={<DeleteOutlined />}></Button> */}
			</Space>
		),
	},
];
const data = [
	{
		key: '1',
		image: 'https://picsum.photos/200/200',
		code: 'AZ100',
		name: 'Bản vẽ nhà cấp 4 5x10',
		group: 'Nhà cấp 4',
		views: 1000,
		likes: 500,
		updated_at: '10:10 10/10/2020',
		partner: 'KTS. Phan Tin Tưởng',
	},
	{
		key: '2',
		image: 'https://picsum.photos/200/200',
		code: 'AZ100',
		name: 'Bản vẽ nhà cấp 4 5x10',
		group: 'Nhà cấp 4',
		views: 1000,
		likes: 500,
		updated_at: '10:10 10/10/2020',
		partner: 'KTS. Phan Tin Tưởng',
	},
	{
		key: '3',
		image: 'https://picsum.photos/200/200',
		code: 'AZ100',
		name: 'Bản vẽ nhà cấp 4 5x10',
		group: 'Nhà cấp 4',
		views: 1000,
		likes: 500,
		updated_at: '10:10 10/10/2020',
		partner: 'KTS. Phan Tin Tưởng',
	},
	{
		key: '4',
		image: 'https://picsum.photos/200/200',
		code: 'AZ100',
		name: 'Bản vẽ nhà cấp 4 5x10',
		group: 'Nhà cấp 4',
		views: 1000,
		likes: 500,
		updated_at: '10:10 10/10/2020',
		partner: 'KTS. Phan Tin Tưởng',
	},
	{
		key: '5',
		image: 'https://picsum.photos/200/200',
		code: 'AZ100',
		name: 'Bản vẽ nhà cấp 4 5x10',
		group: 'Nhà cấp 4',
		views: 1000,
		likes: 500,
		updated_at: '10:10 10/10/2020',
		partner: 'KTS. Phan Tin Tưởng',
	},
	{
		key: '6',
		image: 'https://picsum.photos/200/200',
		code: 'AZ100',
		name: 'Bản vẽ nhà cấp 4 5x10',
		group: 'Nhà cấp 4',
		views: 1000,
		likes: 500,
		updated_at: '10:10 10/10/2020',
		partner: 'KTS. Phan Tin Tưởng',
	},
	{
		key: '7',
		image: 'https://picsum.photos/200/200',
		code: 'AZ100',
		name: 'Bản vẽ nhà cấp 4 5x10',
		group: 'Nhà cấp 4',

		views: 1000,
		likes: 500,
		updated_at: '10:10 10/10/2020',
		partner: 'KTS. Phan Tin Tưởng',
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
				<Button type='link' icon={<ClearOutlined />}>Clear</Button>
			</div>
			<div className='mb-5  hidden' id='list-action'>
				<div className='flex gap-4'>
                    <Button type='link' icon={<DeleteOutlined />}>Xóa nhiều</Button>
                    {/* <Button type='link' icon={<UnlockOutlined />}>Mở khóa</Button>
                    <Button type='link' icon={<MessageOutlined />}>Gửi tin nhắn</Button> */}
				</div>
			</div>
			<Table
				rowSelection={{
					...rowSelection,
				}}
				pagination={false}
				columns={columns}
				dataSource={data}
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
