'use client';
import React, {use} from 'react';
import BaseIcon from '../../components/BaseIcon';
import {LockIcon, MomoIcon, ZaloPayIcon} from '../../contants/icon';
import PropTypes from 'prop-types';
import {getProductDetailsById} from '../../apis/product';


export default function Payment({params, searchParams}) {
	const productDetails = use(getProductDetailsById(searchParams.id));
	console.log(productDetails);
	const {code, name, admin, price, sale} = productDetails;
	return (
		<div className='w-1/2 m-auto grid grid-cols-4 gap-5 '>
			<div className='col-span-3'>
				<div className='bg-white  text-gray-600 rounded-md shadow my-5 p-5'>
					<div className='bg-gray-100 p-3 rounded mb-3'>THÔNG TIN BẢN VẼ</div>

					<div className=''>
						<div>
							Mã số : <span className='font-semibold'>{code}</span>{' '}
						</div>
						<div>
							Tên bản vẽ : <span className='font-semibold'>{name}</span>
						</div>
						<div>
							Tác giả :<span className='font-semibold'> {admin.name}</span>{' '}
						</div>
						<div>
							Giá bán:{' '}
							<span className='font-semibold'>
								{price.toLocaleString('vi-VN')} VND
							</span>{' '}
						</div>
						<div className='border border-green-400 rounded-md border-dashed p-3 m-2'>
							<div className='flex items-center gap-2'>
								<svg
									className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'></path>
								</svg>
								1 File Bản vẽ Autocad{' '}
							</div>
							<div className='flex items-center gap-2'>
								<svg
									className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'></path>
								</svg>
								1 File Bản vẽ PDF
							</div>
							<div className='flex items-center gap-2'>
								<svg
									className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'></path>
								</svg>
								1 File Khối lượng Excel{' '}
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white  text-gray-600 rounded-md shadow my-5 p-5'>
					<div className='bg-gray-100 p-3 rounded  mb-3'>THÔNG TIN NGƯỜI MUA</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='col-span-1 flex flex-col'>
							<label htmlFor='name'>Họ và tên</label>
							<input id='name' placeholder='Nguyen Van A' className='border p-2' />
						</div>
						<div className='col-span-1 flex flex-col'>
							<label htmlFor='email'>Email</label>
							<input
								id='email'
								placeholder='nguyenvana@gmail.com'
								className='border p-2'
							/>
						</div>
					</div>
				</div>
				<div className='bg-white  text-gray-600 rounded-md shadow my-5 p-5'>
					<div className='bg-gray-100 p-3 rounded  mb-3'>PHƯƠNG THỨC THANH TOÁN</div>

					<div className=''>
						<div className='flex items-center mb-4'>
							<input
								id='default-radio-1'
								type='radio'
								value=''
								name='default-radio'
								className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 '
							/>
							<label
								htmlFor='default-radio-1'
								className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-3'>
								Zalopay <BaseIcon icon={ZaloPayIcon} />
							</label>
						</div>
						<div className='flex items-center'>
							<input
								checked
								id='default-radio-2'
								type='radio'
								value=''
								name='default-radio'
								className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 '
							/>
							<label
								htmlFor='default-radio-2'
								className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-3'>
								Momo
								<BaseIcon icon={MomoIcon} />
							</label>
						</div>
					</div>
				</div>
				<div className='    my-5  '>
					<div type='checkbox'>
						Lưu ý link download bản vẽ sẻ được gửi về địa chỉ email của bạn
					</div>
				</div>
				<div className='bg-green-500 cursor-pointer flex items-center justify-center gap-2 hover:bg-green-400   rounded-md shadow my-5 p-5  font-semibold text-xl text-center text-white'>
					<BaseIcon icon={LockIcon} /> THANH TOÁN 100.000 VND
				</div>
			</div>
			<div>
				<div title='MUA BẢN VẼ' className='mt-5'>
					<ul className='mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400'>
						<li className='flex items-center space-x-3'>
							<svg
								className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
									clipRule='evenodd'></path>
							</svg>
							<span>Individual configuration</span>
						</li>
						<li className='flex items-center space-x-3'>
							<svg
								className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
									clipRule='evenodd'></path>
							</svg>
							<span>No setup, or hidden fees</span>
						</li>
						<li className='flex items-center space-x-3'>
							<svg
								className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
									clipRule='evenodd'></path>
							</svg>
							<span>
								Team size:{' '}
								<span className='font-semibold text-gray-900 dark:text-white'>
									1 developer
								</span>
							</span>
						</li>
						<li className='flex items-center space-x-3'>
							<svg
								className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
									clipRule='evenodd'></path>
							</svg>
							<span>
								Premium support:{' '}
								<span className='font-semibold text-gray-900 dark:text-white'>
									6 months
								</span>
							</span>
						</li>
						<li className='flex items-center space-x-3'>
							<svg
								className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
									clipRule='evenodd'></path>
							</svg>
							<span>
								Free updates:{' '}
								<span className='font-semibold text-gray-900 dark:text-white'>
									6 months
								</span>
							</span>
						</li>
					</ul>

					<button className='bg-gray-300 text-gray-500 p-2 w-full rounded-md  mt-5 flex items-center gap-2 justify-center'>
						{/* <DownloadOutlined /> */}
						TRỢ GIÚP
					</button>
				</div>
			</div>
		</div>
	);
}
Payment.propTypes = {
	params: PropTypes.object,
	searchParams: PropTypes.object,
};
