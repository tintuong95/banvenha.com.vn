import {Divider} from 'antd';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import {getAccountById, updateAccount} from '../../../apis/account';
import BaseInput from '../../../components/input';
import BaseInputSub from '../../../components/input-sub';
import BaseUploadEdit from '../../../components/upload-edit';
import {NOTIFICATION_TYPE} from '../../../contants/table';
import {getProfileApi} from '../../../stores/apis/auth';
import {openNotification} from '../../../utils/notification';

export default function PartnerDetails() {
	const [profile, setProfile] = useState({});
		const {id} = useParams();

	const fetchGetProfile = () => {
		getAccountById(id)
			.then((result) => {
				setProfile(result.data);
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
				edit={false}
				value={profile?.fullName}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'address'}
				label={'Địa chỉ'}
				edit={false}
				value={profile?.address}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'tel'}
				label={'Số điện thoại'}
				edit={false}
				value={profile?.tel}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'email'}
				label={'Email'}
				edit={false}
				value={profile?.email}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'bankName'}
				label={'Tên ngân hàng'}
				edit={false}
				value={profile?.bankName}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'bankNumber'}
				label={'Số tài khoản'}
				edit={false}
				value={profile?.bankNumber}
			/>
			<Divider />
			<BaseInput
				id={profile.id}
				field={'bankHolder'}
				label={'Tên chủ thẻ'}
				edit={false}
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
