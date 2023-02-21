import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Divider, QRCode, Select} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import {getOrderDetailsApi, updateStatusOrderApi} from '../../../apis/order';
import {openNotification} from '../../../utils/notification';
import {NOTIFICATION_TYPE} from '../../../contants/table';

function OrderDetails() {
	const {id} = useParams();
	const navigate = useNavigate();
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
	const fetchUpdateStatusOrder = (id,status) => {
		updateStatusOrderApi(id, status)
			.then((result) => {
				openNotification(NOTIFICATION_TYPE.success, 'Cập nhật thành công !');
			})
			.catch(() => {
				openNotification(NOTIFICATION_TYPE.error, 'Cập nhật thất bại !');
			});
	};

	const onChangeStatusOrder = (e) => {
		console.log(e)
		fetchUpdateStatusOrder(id, e);
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
					Trạng thái :{}
					<Select
						value={Number(detailsOrder?.status)}
						style={{width: 180}}
						onChange={onChangeStatusOrder}
						options={[
							{value: 0, label: 'Chưa thanh toán'},
							{value: 1, label: 'Đã thanh toán'},
						]}
					/>
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
