// import ChartColumn from '../../../components/ChartColumn';
import CountUp from 'react-countup';
import {Badge, Divider, Statistic, Switch, Table, Tag} from 'antd';
import {
	// DeleteOutlined,
	// UnlockOutlined,
	// MessageOutlined,
	EyeOutlined,
	LikeOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';

const formatter = (value) => <CountUp end={value} separator=',' />;
const formatterNumber = (value) => <CountUp end={value} />;
const columns = [
	{
		title: 'Mã',
		dataIndex: 'code',
		key: 'code',
		render: (text) => {
			return (
				<div className='flex  items-center'>
					<span className='mr-2'>{text}</span>
					<Badge
						count={'NEWS'}
						style={{backgroundColor: '#87d068'}}></Badge>
				</div>
			);
		},
	},

	{
		title: 'Tên',
		dataIndex: 'name',
		key: 'name',
		render: (_, record) => {
			return (
				<div className='flex flex-col'>
					<span className='font-semibold'>{record.name}</span>
					<a href='#d' className='text-slate-500'>
						{record.partner}
					</a>
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
	// {
	// 	title: 'Thao tác',
	// 	key: 'action',
	// 	render: () => (
	// 		<Space size='middle'>
	// 			<Tooltip placement='top' title={'Gửi tin nhắn'}>
	// 				<Button type='link' icon={<MessageOutlined />}></Button>
	// 			</Tooltip>
	// 			<Tooltip placement='top' title={'Khóa sản phẩm'}>
	// 				<Button type='text' icon={<UnlockOutlined />}></Button>
	// 			</Tooltip>
	// 			<Tooltip placement='top' title={'Xóa sản phẩm'}>
	// 				<Button type='link' danger icon={<DeleteOutlined />}></Button>
	// 			</Tooltip>

	// 			{/* <Button type='link' danger icon={<DeleteOutlined />}></Button> */}
	// 		</Space>
	// 	),
	// },
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
];
const DashBoard = () => {
	return (
		<>
			<div className='bg-white p-5 rounded'>
				<div className='mb-5 flex justify-between items-center'>
					<div>
						<span>Chào bạn </span>
						<span className='text-2xl font-bold text-blue-400'>
							Tin Tưởng <Tag color='#87d068'>Level 1</Tag>
						</span>
					</div>
					<span className='text-slate-400'>Ngày tạo : 10/10/2012</span>
				</div>
				<Divider />
				<div className='grid grid-cols-4 mb-5'>
					<div className='text-center'>
						<Statistic
							title='DOANH THU THÁNG  (VND)'
							value={112893}
							precision={2}
							formatter={formatter}
						/>
					</div>
					<div className='text-center'>
						<Statistic
							title='TỔNG DOANH THU (VND)'
							value={112893}
							formatter={formatter}
						/>
					</div>
					<div className='text-center'>
						<Statistic title='SẢN PHẨM ' value={112} formatter={formatterNumber} />
					</div>
					<div className='text-center'>
						<Statistic
							title='BÀI VIẾT'
							value={112}
							precision={2}
							formatter={formatterNumber}
						/>
					</div>
				</div>
				<Divider />
				<div className='grid grid-cols-4 mb-5'>
					<div className='text-center'>
						<Statistic
							title='LƯỢT MUA (THÁNG)'
							value={112}
							precision={2}
							formatter={formatterNumber}
						/>
					</div>
					<div className='text-center'>
						<Statistic title='LƯỢT MUA' value={112} formatter={formatterNumber} />
					</div>

					<div className='text-center'>
						<Statistic title='LƯỢT XEM' value={112893} formatter={formatterNumber} />
					</div>
					<div className='text-center'>
						<Statistic
							title='LƯỢT THÍCH'
							value={112893}
							precision={2}
							formatter={formatterNumber}
						/>
					</div>
				</div>
			</div>
			<div className='mt-8'>
				<Table pagination={false} columns={columns} dataSource={data} />
			</div>
		</>
	);
};
export default DashBoard;
