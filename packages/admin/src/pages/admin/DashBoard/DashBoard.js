// import ChartColumn from '../../../components/ChartColumn';
import CountUp from 'react-countup';
import {Badge, Button, Divider, QRCode, Statistic, Switch, Table, Tag} from 'antd';
import {DownCircleOutlined, LoadingOutlined} from '@ant-design/icons';

import {useEffect, useState} from 'react';
import {useMitt} from 'react-mitt';
import {useSelector} from 'react-redux';
import { getOrderListApi, getRevenueMonthApi, getRevenueTotalApi } from '../../../apis/order';
import { countProductApi, getViewsLikesApi } from '../../../apis/product';
import { countNewsApi } from '../../../apis/news';
import { ORDER_STATUS } from '../../../contants/table';

// import BaseIcon from '../../../components/BaseIcon';
// import {WiTime5} from 'react-icons/wi';
const formatter = (value) => <CountUp end={value} separator=',' />;
const formatterNumber = (value) => <CountUp end={value} />;

const DashBoard = () => {
	const {emitter} = useMitt();
	const [orderList, setOrderList] = useState([]);
	const {self} = useSelector((state) => state.auth);
	const [revenueMonthData, setRevenueMonthData] = useState({
		revenueMonth: 0,
		countOrderMonth: 0,
	});
	const [revenueTotalData, setRevenueTotalData] = useState({
		revenueTotal: 0,
		countOrderTotal: 0,
	});

	const [viewLikeData, setViewLikeData] = useState({
		countViewsProduct: 0,
		countLikesProduct: 0,
	});

	const [countNews, setCountNews] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

		const columns = [
			{
				title: 'QRcode',
				dataIndex: 'qrcode',
				key: 'qrcode',
				render: () => <QRCode size={60} value='https://ant.design/' />,
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
				render: (text) => (
					<Tag className='text-sm' color='blue'>
						{text.toLocaleString('vi-VN')} VND
					</Tag>
				),
			},

			{
				title: 'Thanh toán',
				dataIndex: 'status',
				key: 'status',
				render: (text) => {
					return (
						<div className='w-full flex items-center gap-2'>
							{text == ORDER_STATUS.success ? (
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
	const fetchRevenueMonth = () => {
		getRevenueMonthApi()
			.then((result) => {
				const {count, sum} = result.data;
				setRevenueMonthData({
					...revenueMonthData,
					revenueMonth: sum,
					countOrderMonth: count,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchRevenueTotal = () => {
		getRevenueTotalApi()
			.then((result) => {
				const {count, sum} = result.data;
				setRevenueTotalData({
					...revenueTotalData,
					revenueTotal: sum,
					countOrderTotal: count,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchViewsLikesTotal = () => {
		getViewsLikesApi()
			.then((result) => {
				const {views, likes} = result.data;
				setViewLikeData({
					...viewLikeData,
					countViewsProduct: views,
					countLikesProduct: likes,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchCountNews = () => {
		countNewsApi()
			.then((result) => {
				const {count} = result.data;
				setCountNews(count);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const fetchCountProduct = () => {
		countProductApi()
			.then((result) => {
				const {count} = result.data;
				setCountProducts(count);
			})
			.catch((err) => {
				console.error(err);
			});
	};

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
	useEffect(() => {
		fetchRevenueMonth();
		fetchRevenueTotal();
		fetchViewsLikesTotal();
		fetchCountNews();
		fetchCountProduct();
		fetchOrderList();
	}, []);
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
					<div className='text-slate-400 flex item-center'>
						{/* <BaseIcon color={'gray'} size={34}>
							<WiTime5 />
						</BaseIcon> */}
						Ngày tạo : 10/10/2012
					</div>
				</div>
				<Divider />
				<div className='grid grid-cols-4 mb-5'>
					<div className='text-center'>
						<Statistic
							title='DOANH THU THÁNG  (VND)'
							value={revenueMonthData?.revenueMonth}
							precision={2}
							formatter={formatter}
						/>
					</div>
					<div className='text-center'>
						<Statistic
							title='TỔNG DOANH THU (VND)'
							value={revenueTotalData.revenueTotal}
							formatter={formatter}
						/>
					</div>
					<div className='text-center'>
						<Statistic
							title='SẢN PHẨM '
							value={countProducts}
							formatter={formatterNumber}
						/>
					</div>
					<div className='text-center'>
						<Statistic
							title='BÀI VIẾT'
							value={countNews}
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
							value={revenueMonthData.countOrderMonth}
							precision={2}
							formatter={formatterNumber}
						/>
					</div>
					<div className='text-center'>
						<Statistic
							title='LƯỢT MUA'
							value={revenueTotalData.countOrderTotal}
							formatter={formatterNumber}
						/>
					</div>

					<div className='text-center'>
						<Statistic
							title='LƯỢT XEM'
							value={viewLikeData.countViewsProduct}
							formatter={formatterNumber}
						/>
					</div>
					<div className='text-center'>
						<Statistic
							title='LƯỢT THÍCH'
							value={viewLikeData.countLikesProduct}
							precision={2}
							formatter={formatterNumber}
						/>
					</div>
				</div>
			</div>
			<div className='mt-8'>
				<Table pagination={false} columns={columns} dataSource={orderList?.data} />
			</div>
		</>
	);
};
export default DashBoard;
