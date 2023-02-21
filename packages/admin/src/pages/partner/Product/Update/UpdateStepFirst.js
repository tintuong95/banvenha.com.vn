import {Button, Divider, Form, Input, Select} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React, {useEffect, useState} from 'react';
import {
	InboxOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {validateRequired} from '../../../../utils/validate';
import {MESSAGE_REQUIRE_INPUT} from '../../../../contants/message';
import {InfoCircleOutlined} from '@ant-design/icons';
import {getProductGroupApi, updateProduct} from '../../../../apis/product';
import BaseUpload from '../../../../components/BaseUpload';
import BaseInputEdit from '../../../../components/BaseInputEdit';
import BaseSelectEdit from '../../../../components/BaseSelectEdit';
import BaseTextAreaEdit from '../../../../components/BaseTextAreaEdit';
import BaseUploadEdit from '../../../../components/BaseUploadEdit';

export default function UpdateStepFirst({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) {
	const [productGroupList, setProductGroupList] = useState([]);
	const onEventTarget = (evt) => {
		const {value, name} = evt.target;
		setDataProduct({...dataProduct, [name]: value});
	};

	const fetchProductGroupList = () => {
		getProductGroupApi()
			.then((result) => setProductGroupList(result.data))
			.catch((err) => {
				console.log(err);
			});
	};
	const productGroupOption = () =>
		productGroupList.map((item) => ({
			label: item.name,
			value: item.id,
		}));
		
	useEffect(() => {
		fetchProductGroupList();
	}, []);

	return (
		<div>
			<BaseInputEdit
				id={dataProduct?.id}
				name={'name'}
				value={dataProduct?.name}
				label={'Tên bài viết'}
				placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
				fetchUpdate={updateProduct}
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
			<BaseSelectEdit
				id={dataProduct?.id}
				option={productGroupOption()}
				name={'group_id'}
				value={dataProduct?.group_id}
				label={'Nhóm tin tức'}
				fetchUpdate={updateProduct}
				placeholder={'Vui lòng chọn'}
				rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
			<BaseTextAreaEdit
				id={dataProduct?.id}
				name={'description'}
				value={dataProduct?.description}
				label={'Mô tả'}
				fetchUpdate={updateProduct}
				placeholder={'Vui lòng nhập mô tả ngắn gọn'}
				tooltip={{
					title: 'Tooltip with customize icon',
					icon: <InfoCircleOutlined />,
				}}
			/>
			<Divider />
			<BaseUploadEdit
				fetchUpdate={updateProduct}
				count={1}
				data={dataProduct}
				label={'Hình đại diện'}
				field={'image'}
			/>

			<Divider />
			<BaseUploadEdit
				fetchUpdate={updateProduct}
				count={5}
				data={dataProduct}
				label={'Danh sách hình'}
				field={'images'}
			/>
			<Divider />
			<div className='m-auto flex justify-end mt-5 gap-5'>
				<Button
					className='w-1/2'
					icon={<ArrowLeftOutlined />}
					disabled={stepPage === 1}
					onClick={setStepPage}>
					Previous
				</Button>
				<Button className='w-1/2' onClick={onNextStep} disabled={stepPage === 4}>
					Next
					<ArrowRightOutlined />
				</Button>
			</div>
		</div>
	);
}

UpdateStepFirst.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
