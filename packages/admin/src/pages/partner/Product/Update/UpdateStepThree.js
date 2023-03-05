import {
	Button,
	Divider,
	Form,
	Input,
	Modal,
	notification,
	Result,
	Tag,
} from 'antd';
import PropTypes from 'prop-types';
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	MehOutlined,
	SmileOutlined,
	RobotOutlined,
	ExclamationCircleFilled,
	InfoCircleOutlined,
} from '@ant-design/icons';
import {NOTIFICATION_TYPE, PRODUCT_PUBLISHED} from '../../../../contants/table';
import {createProduct, updateProduct} from '../../../../apis/product';
import {validateRequired} from '../../../../utils/validate';
import {MESSAGE_REQUIRE_INPUT} from '../../../../contants/message';
import BaseInputEdit from '../../../../components/input-edit';
const {confirm} = Modal;
const UpdateStepThree = ({
	stepPage,
	setStepPage,
	onNextStep,
	onPreviousStep,
	dataProduct,
	setDataProduct,
}) => {
	

	const priceAfterSales = (price, sale) => {
		return +price - (+price * +sale) / 100;
	};

	return (
		<>
			<h1 className='mb-7'>Step 3 : CẬP NHẬT SẢN PHẨM</h1>
			<div className=' m-auto'>
				<div>
					<BaseInputEdit
						id={dataProduct?.id}
						name={'price'}
						value={dataProduct?.price}
						label={'Giá bán'}
						placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
						fetchUpdate={updateProduct}
						rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
						tooltip={{
							title: 'Tooltip with customize icon',
							icon: <InfoCircleOutlined />,
						}}
					/>
					<Divider />
					<BaseInputEdit
						id={dataProduct?.id}
						name={'sale'}
						value={dataProduct?.sale}
						label={'Sale'}
						placeholder={'Nhập tên bài viết ấn tượng nhất :))'}
						fetchUpdate={updateProduct}
						rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
						tooltip={{
							title: 'Tooltip with customize icon',
							icon: <InfoCircleOutlined />,
						}}
					/>
					<Divider />
					<Form.Item
						name='lastprice'
						label='Giá cuối'
						rules={[validateRequired(MESSAGE_REQUIRE_INPUT)]}
						tooltip={{
							title: 'Tooltip with customize icon',
							icon: <InfoCircleOutlined />,
						}}>
						<Tag className='text-base' color='#2db7f5'>
							{priceAfterSales(dataProduct.price, dataProduct.sale).toLocaleString(
								'vi-VN'
							)}{' '}
							&nbsp; VND
						</Tag>
					</Form.Item>
				</div>
			</div>
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
					htmlType='submit'
					disabled={stepPage === 5}>
					Next
					<ArrowRightOutlined />
				</Button>
			</div>
		</>
	);
};
export default UpdateStepThree;

UpdateStepThree.propTypes = {
	stepPage: PropTypes.number,
	setStepPage: PropTypes.func,
	onNextStep: PropTypes.func,
	onPreviousStep: PropTypes.func,
	dataProduct: PropTypes.object,
	setDataProduct: PropTypes.func,
};
