import { Divider } from 'antd';
import React from 'react'
import BaseInput from '../../../components/BaseInput'

export default function AccountDetails() {
  return (
			<div className='flex flex-col'>
				<BaseInput label={"Họ và tên"} value={"Phan Tin Tưởng"}/>
				<Divider />
				<BaseInput label={"Nickname"} value={"Believe"}/>
				<Divider />
				<BaseInput label={"Địa chỉ"} value={"Phú Thứ Tây Hòa Phú Yên"}/>
				<Divider />
				<BaseInput label={"Số điện thoại"} value={"098324234"}/>
				<Divider />
				<BaseInput label={"Email"} value={"tintuong@mail.com"}/>
				<Divider />
				<BaseInput label={"Phường/Xã"} value={"Hòa Bình 2"}/>
				<Divider />
				<BaseInput label={"Quận/Huyện"} value={"Tây Hòa"}/>
				<Divider />
				<BaseInput label={"Tỉnh/Thành Phố"} value={"Phú Yên"}/>
				<Divider />
				
			</div>
		);
}
