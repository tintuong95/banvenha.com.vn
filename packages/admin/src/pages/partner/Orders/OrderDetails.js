import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Divider, QRCode} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import {getOrderDetailsApi} from '../../../apis/order';

function OrderDetails() {
	const {id} = useParams();
	const navigate =useNavigate()
	const [detailsOrder, setDetailsOrder] = useState();

	const fetchOrderDetails = (id) => {
		getOrderDetailsApi(id)
			.then((result) => {
				setDetailsOrder(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchOrderDetails(id);
	}, []);

	
	return (
		<div className='text-base w-96'>
			<QRCode value='https://ant.design/' />

			<Divider />
			<div className='my-3 flex flex-col gap-3'>
				<div className='font-semibold'>THÔNG TIN ĐƠN HÀNG</div>
				<div className='flex items-center gap-4'>
					Mã đơn : <div className='font-semibold'>{detailsOrder?.code}</div>
				</div>
				<div className='flex items-center gap-4'>
					Ngày tạo :{' '}
					<div className='font-semibold'>
						{moment(detailsOrder?.updated_at).format('hh:mm DD/MM/YYYY')}
					</div>
				</div>
				<div className='flex items-center gap-4'>
					Số tiền :{' '}
					<div className='font-semibold'>
						{detailsOrder?.price.toLocaleString('vi-VN')} VND
					</div>
				</div>
				<div className='flex items-center gap-4'>
					Trạng thái :{' '}
					<div className='font-semibold'>
						{detailsOrder?.status == 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}
					</div>
				</div>
			</div>
			<Divider />
			<div className='my-3 flex flex-col gap-3'>
				<div className='font-semibold'>THÔNG TIN KHÁCH HÀNG</div>
				<div className='flex items-center gap-4'>
					Họ tên : <div className='font-semibold'>{detailsOrder?.name}</div>
				</div>
				<div className='flex items-center gap-4'>
					Email : <div className='font-semibold'>{detailsOrder?.email}</div>
				</div>
			</div>
			<Divider />
			<div className='my-3 flex flex-col gap-3'>
				<div className='font-semibold'>THÔNG TIN TÁC GIẢ</div>
				<div className='flex items-center gap-4'>
					Họ tên : <div className='font-semibold'>{detailsOrder?.admin?.name}</div>
				</div>
				<div className='flex items-center gap-4'>
					Phone : <div className='font-semibold'>{detailsOrder?.admin?.tel}</div>
				</div>
				<div className='flex items-center gap-4'>
					Email : <div className='font-semibold'>{detailsOrder?.admin?.email}</div>
				</div>
				<div className='flex items-center gap-4'>
					Địa chỉ :{' '}
					<div className='font-semibold'>{detailsOrder?.admin?.address}</div>
				</div>
			</div>
			<Divider />
			<Button
				onClick={() => {
					navigate(-1);
				}}>
				Go Back Home
			</Button>
		</div>
	);
}

OrderDetails.propTypes = {};

export default OrderDetails;
