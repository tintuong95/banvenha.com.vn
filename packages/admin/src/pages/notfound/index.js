import {SmileOutlined} from '@ant-design/icons';
import {Button, Result} from 'antd';
import React from 'react';

export default function NotFound() {
	return (
		<div className='h-screen flex items-center justify-center'>
			<Result
				className='mb-20'
				icon={<SmileOutlined  twoToneColor='red' />}
				title='Chúc bạn một ngày tốt lành !'
                subTitle="Trang không tồn tại."
                status={'info'}            
				extra={<Button type='primary'>TRANG CHỦ</Button>}
			/>
		</div>
	);
}
