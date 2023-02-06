import { Button, Input } from 'antd';
import React from 'react';
import {LoginOutlined} from '@ant-design/icons';
export default function Login() {
	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<a
					href='#d'
					className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
					<img
						className='w-8 h-8 mr-2'
						src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
						alt='logo'
					/>
					BANVE.COM.VN
				</a>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Đăng nhập với tài khoản
						</h1>
						<form className='space-y-4 md:space-y-6' action='#'>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Username
								</label>
								<Input size='large' />
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Password
								</label>
								<Input size='large' />
							</div>
							<div className='flex items-center justify-between'>
								<div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input
											id='remember'
											aria-describedby='remember'
											type='checkbox'
											className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
											required=''
										/>
									</div>
									<div className='ml-3 text-sm'>
										<label
											htmlFor='remember'
											className='text-gray-500 dark:text-gray-300'>
											Ghi nhớ
										</label>
									</div>
								</div>
								<a
									href='#d'
									className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
									Bạn quên mật khẩu ?
								</a>
							</div>
							<Button size='large' type='primary w-full'>
								<LoginOutlined />
								ĐĂNG NHẬP
							</Button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400 '>
								Bạn muốn đăng ký ? &nbsp;
								<a
									href='#s'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
									Đăng ký
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
