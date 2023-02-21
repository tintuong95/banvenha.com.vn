import {Button, Divider, Form, Input, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import BaseUpload from '../../../../components/BaseUpload';
import {InfoCircleOutlined} from '@ant-design/icons';
import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {getNewsGroupApi, updateNews} from '../../../../apis/news';
import BaseInputEdit from '../../../../components/BaseInputEdit';
import BaseSelectEdit from '../../../../components/BaseSelectEdit';
import BaseTextAreaEdit from '../../../../components/BaseTextAreaEdit';
import { validateRequired } from '../../../../utils/validate';
import { MESSAGE_REQUIRE_INPUT } from '../../../../contants/message';
import BaseUploadEdit from '../../../../components/BaseUploadEdit';

export default function CreateStepFirst({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataNews,
	setDataNews,
}) {
	const [newsGroupList, setNewsGroupList] = useState([]);
	const onFinishFailed = () => {};

	const fetchNewsGroupList = () => {
		getNewsGroupApi()
			.then((result) => setNewsGroupList(result.data))
			.catch((err) => {
				console.log(err);
			});
	};

	const newsGroupOptions = () =>
		newsGroupList.map((item) => ({
			label: item.name,
			value: item.id,
		}));

	const onEventTarget = (evt) => {
		const {value, name} = evt.target;
		setDataNews({...dataNews, [name]: value});
	};

	useEffect(() => {
		fetchNewsGroupList();
	}, [dataNews.id]);
	return (
		<div

		// labelAlign='left'
		// onFinish={onNextStep}
		// layout='horizontal'
		>
			<BaseInputEdit
				id={dataNews?.id}
				name={'name'}
				value={dataNews?.name}
				label={'Tên bài viết'}
				placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
				fetchUpdate={updateNews}
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
			<BaseSelectEdit
				id={dataNews?.id}
				option={newsGroupOptions()}
				name={'group_id'}
				value={dataNews?.group_id}
				label={'Nhóm tin tức'}
				fetchUpdate={updateNews}
				placeholder={'Vui lòng chọn'}
				// rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
			<BaseTextAreaEdit
				id={dataNews?.id}
				name={'description'}
				value={dataNews?.description}
				label={'Mô tả'}
				fetchUpdate={updateNews}
				placeholder={'Vui lòng nhập mô tả ngắn gọn'}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
		
				<BaseUploadEdit
					fetchUpdate={updateNews}
					count={1}
					data={dataNews}
					label={"Hình đại diện"}
					field={"image"}
				/>
			
			<Divider />
			<div className='m-auto flex justify-end mt-5 gap-5'>
				<Button
					className='w-1/2'
					icon={<ArrowLeftOutlined />}
					disabled={stepPage === 1}
					onClick={onPreviousStep}>
					Previous
				</Button>
				<Button
					onClick={onNextStep}
					className='w-1/2'
					htmlType='button'
					disabled={stepPage === 3}>
					{' '}
					Next
					<ArrowRightOutlined />
				</Button>
			</div>
		</div>
	);
}
CreateStepFirst.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataNews: PropTypes.object,
	setDataNews: PropTypes.func,

};
