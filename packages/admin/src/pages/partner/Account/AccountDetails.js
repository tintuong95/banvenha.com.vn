import {Divider} from 'antd';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {updateAccount} from '../../../apis/account';
import BaseInput from '../../../components/input';
import BaseInputSub from '../../../components/input-sub';
import BaseUploadEdit from '../../../components/upload-edit';
import {NOTIFICATION_TYPE} from '../../../contants/table';
import {getProfileApi} from '../../../stores/apis/auth';
import {openNotification} from '../../../utils/notification';

export default function AccountDetails() {
	const [profile, setProfile] = useState({});

	const fetchGetProfile = () => {
		getProfileApi()
			.then((result) => {
				setProfile(result.data.self);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchGetProfile();
	}, []);

	return (
		<div className='flex flex-col'>
			<BaseInputSub
				field={'status'}
				id={profile.id}
				label={'Trạng thái'}
				value={profile?.status}
				deletedAt={profile?.deletedAt}
				edit={false}
			/>
			<Divider />
			<BaseInput
				field={'fullName'}
				id={profile.id}
				label={'Họ và tên'}
				value={profile?.fullName}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'address'}
				label={'Địa chỉ'}
				value={profile?.address}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'tel'}
				label={'Số điện thoại'}
				value={profile?.tel}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'email'}
				label={'Email'}
				value={profile?.email}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'bankName'}
				label={'Tên ngân hàng'}
				value={profile?.bankName}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'bankNumber'}
				label={'Số tài khoản'}
				value={profile?.bankNumber}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'bankHolder'}
				label={'Tên chủ thẻ'}
				value={profile?.bankHolder}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'level'}
				edit={false}
				label={'Cấp'}
				value={profile?.level}
			/>
			<Divider />
			<BaseInput
				field={'birthday'}
				id={profile.id}
				edit={false}
				label={'Ngày sinh'}
				value={moment(profile?.birthday).format('hh:mm DD/MM/YYYY ')}
			/>
			<Divider />
		</div>
	);
}
