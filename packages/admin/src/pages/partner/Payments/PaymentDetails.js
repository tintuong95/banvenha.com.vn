import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Divider, QRCode} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import {getOrderDetailsApi} from '../../../apis/order';
import { getPaymentDetailsApi } from '../../../apis/payment';

function PaymentDetails() {
	const {id} = useParams();
	const navigate=useNavigate()
	const [detailsPayment, setDetailsPayment] = useState();

	const fetchPaymentDetails = (id) => {
		getPaymentDetailsApi(id)
			.then((result) => {
				setDetailsPayment(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchPaymentDetails(id);
	}, []);

	
	return (
		<div className='text-base w-96'>
			<QRCode value='https://ant.design/' />

			<Divider />
			<div className='my-3 flex flex-col gap-3'>
				<div className='font-semibold'>THÔNG TIN ĐƠN HÀNG</div>
				<div className='flex items-center gap-4'>
					Mã đơn : <div className='font-semibold'>{detailsPayment?.id}</div>
				</div>
				<div className='flex items-center gap-4'>
					Ngày tạo :{' '}
					<div className='font-semibold'>
						{moment(detailsPayment?.updatedAt).format('hh:mm DD/MM/YYYY')}
					</div>
				</div>
				<div className='flex items-center gap-4'>
					Số tiền :{' '}
					<div className='font-semibold'>
						{detailsPayment?.value.toLocaleString('vi-VN')} VND
					</div>
				</div>
				<div className='flex items-center gap-4'>
					Trạng thái :{' '}
					<div className='font-semibold'>
						{detailsPayment?.status == 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}
					</div>
				</div>
			</div>
			<Divider />
			<div className='my-3 flex flex-col gap-3'>
				<div className='font-semibold'>THÔNG TIN GIAO DỊCH</div>
				<div className='flex items-center gap-4'>
					Tên người nhận : <div className='font-semibold'>Phan Tin Tuong</div>
				</div>
				<div className='flex items-center gap-4'>
					Tên ngân hàng :{' '}
					<div className='font-semibold'>{detailsPayment?.bankName}</div>
				</div>
				<div className='flex items-center gap-4'>
					Số tài khoản :{' '}
					<div className='font-semibold'>{detailsPayment?.bankNumber}</div>
				</div>
				<div className='flex items-center gap-4'>
					Mã giao dịch :{' '}
					<div className='font-semibold'>{detailsPayment?.bankTransaction}</div>
				</div>
			</div>
			<Divider />
			<Button onClick={()=>{navigate("/payments")}}>Go Back Home</Button>
		</div>
	);
}

PaymentDetails.propTypes = {};

export default PaymentDetails;
