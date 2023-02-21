import {Alert, Button, Form, Input} from 'antd';
import React, {useEffect} from 'react';
import {LoginOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../stores/actions/auth';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import { validateRegex, validateRequired } from '../../utils/validate';
import { regexEmail } from '../../utils/pattern';
import { MESSAGE_LOGIN_ERROR, MESSAGE_REQUIRE, MESSAGE_TYPE } from '../../contants/message';
import { Logo } from '../../contants/image';

export default function Login() {
	const dispatch = useDispatch();

	const {isLogin,error} = useSelector((state) => state.auth);

	const {control, handleSubmit} = useForm();

	const navigate = useNavigate();

	const onFinish = handleSubmit(({email, password}) => {
		dispatch(loginAction({email, password}));
	});
	console.log("hihi")
	useEffect(() => {
		// $(window.document).ready(function () {
		// 	$('#screen_one').fadeIn(5000);
		// });
		
	}, []);

	useEffect(() => {
		if (isLogin) navigate('/');
	}, [isLogin]);



	return (
		<>
			<section id='screen_one' className=' bg-gray-50 dark:bg-gray-900'>
				<div className='flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
					<img className='w-20  mr-2 animate-bounce ' src={Logo} alt='logo' />
					<div
						href='#d'
						className='flex items-center mb-6 text-3xl font-semibold text-gray-600 dark:text-white'>
						BANVENHA.COM.VN
					</div>

					<div
						id='concept_two'
						className='w-full   bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
								Đăng nhập với tài khoản
							</h1>
							<Form
								name='normal_login'
								className='login-form space-y-4 md:space-y-6'
								onFinish={onFinish}>
								<div>
									<label
										htmlFor='email'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Email
									</label>

									<Controller
										name='email'
										control={control}
										render={({field}) => (
											<Form.Item
												name='email'
												hasFeedback
												rules={[
													validateRequired(MESSAGE_REQUIRE.MAIL),
													validateRegex(MESSAGE_TYPE.MAIL, regexEmail),
												]}>
												<Input
													placeholder='Vui lòng nhập'
													className='border-rose-400 '
													{...field}
													size='large'
													prefix={<MailOutlined className='mr-3' />}
												/>
											</Form.Item>
										)}
									/>
								</div>
								<div>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Password
									</label>

									<Controller
										name='password'
										control={control}
										render={({field}) => (
											<Form.Item
												name='password'
												hasFeedback
												rules={[validateRequired(MESSAGE_REQUIRE.PASSWORD)]}>
												<Input
													placeholder='Vui lòng nhập'
													className='border-rose-400 '
													prefix={<LockOutlined className='mr-3' />}
													{...field}
													size='large'
												/>
											</Form.Item>
										)}
									/>
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
								{error.logging ? (
									<Alert message={MESSAGE_LOGIN_ERROR} type='error' />
								) : (
									''
								)}

								<Button
									size='large'
									type='primary w-full'
									className='bg-rose-500 hover:bg-rose-400'
									htmlType='submit'>
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
							</Form>
						</div>
					</div>
				</div>
			</section>

			{/* <div id="screen_two" className='w-screen  h-screen flex justify-center items-center '>
				<div className='flex flex-col text-lg mb-10'>
					<div>Hãy học như kẻ khờ dại</div>
					<div>Và mơ về những thứ vĩ đại.</div>
					<div className='text-sm text-end'>Ban Ki-moon</div>
				</div>
			</div> */}
		</>
	);
}
