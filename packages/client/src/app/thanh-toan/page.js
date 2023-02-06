'use client';
import {Checkbox, Divider, Form, Input, Radio, Space} from 'antd';
import React from 'react';

export default function Payment() {
	return (
		<>
			<div className='bg-white m-auto w-1/2 rounded-md shadow my-5 p-5'>
				<div>Thông tin bản vẽ</div>
				<Divider className='my-2' />
				<div className=''>
					<div>AM001 - Bản vẽ nhà cấp 4 5x10 - KTS.Phan Tu Tin </div>
					<div>1 File Bản vẽ Autocad </div>
					<div>1 File Bản vẽ PDF</div>
					<div>1 File Khối lượng Excel </div>
				</div>
			</div>
			<div className='bg-white m-auto w-1/2 rounded-md shadow my-5 p-5'>
				<div>Thông tin người mua</div>
				<Divider className='my-2' />
				<div className=''>
					<Form layout='vertical' className='grid grid-cols-2 gap-3'>
						<Form.Item label='Họ và tên' className='mb-0'>
							<Input placeholder='input placeholder' />
						</Form.Item>
						<Form.Item label='Số điện thoại' className='mb-0'>
							<Input placeholder='input placeholder' />
						</Form.Item>
						<Form.Item label='Email' className='mb-0'>
							<Input placeholder='input placeholder' />
						</Form.Item>
						<Form.Item label='Đang sống' className='mb-0'>
							<Input placeholder='input placeholder' />
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className='bg-white m-auto w-1/2 rounded-md shadow my-5 p-5'>
				<div>Phương thức thanh toán</div>
				<Divider className='my-2' />
				<div className=''>
					<Radio.Group>
						<Space direction='vertical'>
							<Radio value={1}>MOMO</Radio>
							<Radio value={2}>VNPAY</Radio>
							<Radio value={3}>NGÂN HÀNG</Radio>
						</Space>
					</Radio.Group>
				</div>
			</div>
			<div className=' m-auto w-1/2  my-5  '>
				<Checkbox>
					Lưu ý link download bản vẽ sẻ được gửi về địa chỉ email của bạn
				</Checkbox>
			</div>
			<div className='bg-green-500 m-auto w-1/2 rounded-md shadow my-5 p-5 text-center text-white'>
				THANH TOÁN BẢO MẬT
			</div>
		</>
	);
}
