// import ChartColumn from '../../../components/ChartColumn';
import CountUp from 'react-countup';
import {Divider, Progress, QRCode, Statistic, Table, Tag} from 'antd';
import {DownCircleOutlined} from '@ant-design/icons';

const formatter = (value) => <CountUp end={value} separator=',' />;
const formatterNumber = (value) => <CountUp end={value} />;
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
		dataIndex: 'user',
		key: 'user',
		render: (_, record) => {
			return (
				<div className='flex flex-col '>
					<span className=''>{record.username}</span>
					<span className='text-slate-400'>{record.email}</span>
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
		title: 'Sản phẩm',
		dataIndex: 'product',
		key: 'product',
		render: (_, record) => {
			return (
				<div className='flex flex-col '>
					<span className='text-slate-400'>{record.product}</span>
					<span className=''>{record.product_name}</span>
				</div>
			);
		},
	},
	{
		title: 'Giá bán',
		dataIndex: 'price',
		render: (text) => <Tag color='red'>{text}</Tag>,
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
	},
];
const data = [
	{
		key: '1',
		code: 'ZE0101',
		partner: 'John Brown',
		product: 'ZE0101',
		price: '300.000',
		updated_at: '10:10 20/02/2022',
		product_name: 'Bản vẽ nhà cấp 4 5x10m',
		username: 'Tin Tưởng',
		email: 'xxxx@mail.com',
	},
	{
		key: '2',
		code: 'ZE0101',
		partner: 'Jim Green',
		product: 'ZE0101',
		price: '300.000',
		updated_at: '10:10 20/02/2022',
		product_name: 'Bản vẽ nhà cấp 4 5x10m',
		username: 'Tin Tưởng',
		email: 'xxxx@mail.com',
	},
	{
		key: '3',
		code: 'ZE0101',
		partner: 'Joe Black',
		product: 'ZE0101',
		price: '300.000',
		updated_at: '10:10 20/02/2022',
		product_name: 'Bản vẽ nhà cấp 4 5x10m',
		username: 'Tin Tưởng',
		email: 'xxxx@mail.com',
	},
	{
		key: '4',
		code: 'ZE0101',
		partner: 'Joe Black',
		product: 'ZE0101',
		price: '300.000',
		updated_at: '10:10 20/02/2022',
		product_name: 'Bản vẽ nhà cấp 4 5x10m',
		username: 'Tin Tưởng',
		email: 'xxxx@mail.com',
	},
	{
		key: '5',
		code: 'ZE0101',
		partner: 'Joe Black',
		product: 'ZE0101',
		price: '300.000',
		updated_at: '10:10 20/02/2022',
		product_name: 'Bản vẽ nhà cấp 4 5x10m',
		username: 'Tin Tưởng',
		email: 'xxxx@mail.com',
	},
];
const DashBoard = () => {
	return (
		<>
			<div className='bg-white p-5 rounded'>
				<div className='mb-5 flex justify-between items-center'>
					<div className='flex flex-col gap-2'>
						<div>
							<span>Chào bạn </span>
							<span className='text-2xl font-bold text-blue-400'>
								Tin Tưởng <Tag color='#87d068'>Level 1</Tag>
							</span>
						</div>

						<Progress percent={30} size='small' />
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
