import {Button, Divider, Form, Input, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import BaseUpload from '../../../../components/upload';
import {InfoCircleOutlined} from '@ant-design/icons';
import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {getBlogGroupApi} from '../../../../apis/news';
import {validateRequired} from '../../../../utils/validate';
import {MESSAGE_REQUIRE_INPUT} from '../../../../contants/message';

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
		getBlogGroupApi()
			.then((result) => setNewsGroupList(result.data))
			.catch((err) => {
				console.log(err);
			});
	};

	const newsGroupOptions = () =>
		newsGroupList.map((item) => ({
			label: item.title,
			value: item.id,
		}));

	const onEventTarget = (evt) => {
		const {value, name} = evt.target;
		setDataNews({...dataNews, [name]: value});
	};

	useEffect(() => {
		fetchNewsGroupList();
	}, []);
	return (
		<>
			<h1 className='mb-7'>Step 1 : TẠO BÀI VIẾT MỚI</h1>
			<Form
				labelCol={{
					span: 6,
				}}
				wrapperCol={{
					span: 18,
				}}
				labelAlign='left'
				onFinish={onNextStep}
				layout='horizontal'>
				<Form.Item
					label='Tên bài viết '
					name='title'
					rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}>
					<Input
						onChange={onEventTarget}
						value={dataNews.title}
						name='title'
						placeholder='Nhập tên bài viết ấn tượng nhất :))'
					/>
				</Form.Item>
				<Divider />
				<Form.Item
					label='Nhóm '
					name='groupId'
					rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}>
					<Select
						onChange={(value) => {
							setDataNews({...dataNews, groupId: value});
						}}
						defaultValue={dataNews.groupId}
						name='groupId'
						placeholder='Vui lòng chọn'
						className='w-1/2'
						// onChange={handleChange}
						options={newsGroupOptions()}
					/>
				</Form.Item>
				<Divider />
				<Form.Item
					label='Mô tả '
					name='description'
					onChange={onEventTarget}
					rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}>
					<Input.TextArea
						name='description'
						defaultValue={dataNews.description}
						rows={4}
						placeholder='Nhập mô tả bài viết của bạn một cách ngắn gọn'
					/>
				</Form.Item>
				<Divider />
				<Form.Item
					label='Hình đại diện '
					name='photo'
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}>
					<BaseUpload
						field={'photo'}
						count={1}
						data={dataNews}
						setData={setDataNews}
					/>
				</Form.Item>
				<Divider />
				<div className='m-auto flex justify-end mt-5 gap-5'>
					<Button
						className='w-1/2'
						icon={<ArrowLeftOutlined />}
						disabled={stepPage === 1}
						onClick={setStepPage}>
						Previous
					</Button>
					<Button className='w-1/2' htmlType='submit' disabled={stepPage === 3}>
						Next
						<ArrowRightOutlined />
					</Button>
				</div>
			</Form>
		</>
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
