import {Alert, Button, Form, Input, Watermark} from 'antd';
import React, {useEffect, useState} from 'react';
import {LoginOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction, signupAction} from '../../stores/actions/auth';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {
	LockOutlined,
	UserOutlined,
	PhoneOutlined,
	MailOutlined,
	HomeOutlined,
} from '@ant-design/icons';
import {validateRegex, validateRequired} from '../../utils/validate';
import {regexEmail} from '../../utils/pattern';
import {
	MESSAGE_LOGIN_ERROR,
	MESSAGE_REQUIRE,
	MESSAGE_TYPE,
	REPASSWORD_ERROR,
} from '../../contants/message';
import {Logo} from '../../contants/image';

export default function Signup() {
	const dispatch = useDispatch();

	const {isLogin, error} = useSelector((state) => state.auth);

	const [repassword, setRepassword] = useState(true);

	const {control, handleSubmit} = useForm();

	const navigate = useNavigate();

	const onFinish = handleSubmit((data) => {
		const {password, repassword} = data;
		if (password !== repassword) {
			setRepassword(false);
		} else {
			delete data.repassword;
			dispatch(signupAction(data));
		}
	});

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
			<section
				id='screen_one'
				className=' bg-gray-50 h-screen w-screen flex justify-end  dark:bg-gray-900'>
				<div className=' flex flex-col h-full   bg-white  shadow justify-center '>
					<div className='flex gap-4 justify-center '>
						<img className='w-20  mr-2 animate-bounce' src={Logo} alt='logo' />
						<div
							href='#d'
							className='flex items-center mb-6 text-3xl font-semibold text-gray-600 dark:text-white'>
							BANVENHA.COM.VN
						</div>
					</div>

					<div id='concept_two' className='w-full    '>
						<div className='p-6'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
								Đăng nhập với tài khoản
							</h1>
							<Form
								name='normal_login'
								className='login-form grid grid-cols-2 gap-4 '
								onFinish={onFinish}>
								<div>
									<label
										htmlFor='fullName'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Họ và tên
									</label>

									<Controller
										name='fullName'
										control={control}
										render={({field}) => (
											<Form.Item
												name='fullName'
												hasFeedback
												rules={[validateRequired(MESSAGE_REQUIRE.FULLNAME)]}>
												<Input
													placeholder='Nguyễn Văn A'
													className='border-rose-400 '
													{...field}
													size='large'
													prefix={<UserOutlined className='mr-3 text-gray-300' />}
												/>
											</Form.Item>
										)}
									/>
								</div>
								<div>
									<label
										htmlFor='tel'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Số điện thoại
									</label>

									<Controller
										name='tel'
										control={control}
										render={({field}) => (
											<Form.Item
												name='tel'
												hasFeedback
												rules={[validateRequired(MESSAGE_REQUIRE.TEL)]}>
												<Input
													placeholder='xxxx.xxx.xxxx'
													className='border-rose-400 '
													prefix={<PhoneOutlined className='mr-3 text-gray-300 ' />}
													{...field}
													size='large'
												/>
											</Form.Item>
										)}
									/>
								</div>
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
												rules={[validateRequired(MESSAGE_REQUIRE.MAIL)]}>
												<Input
													placeholder='xxxx@gmail.com'
													className='border-rose-400 '
													prefix={<MailOutlined className='mr-3 text-slate-300' />}
													{...field}
													size='large'
												/>
											</Form.Item>
										)}
									/>
								</div>

								<div>
									<label
										htmlFor='username'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Tên đăng nhập
									</label>

									<Controller
										name='username'
										control={control}
										render={({field}) => (
											<Form.Item
												name='username'
												hasFeedback
												rules={[validateRequired(MESSAGE_REQUIRE.USERNAME)]}>
												<Input
													placeholder='Vui lòng nhập'
													className='border-rose-400 '
													prefix={<UserOutlined className='mr-3 text-gray-300' />}
													{...field}
													size='large'
												/>
											</Form.Item>
										)}
									/>
								</div>
								<div>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Mật khẩu
									</label>

									<Controller
										name='password'
										control={control}
										render={({field}) => (
											<Form.Item
												name='password'
												hasFeedback
												rules={[validateRequired(MESSAGE_REQUIRE.PASSWORD)]}>
												<Input.Password
													placeholder='Vui lòng nhập'
													className='border-rose-400 '
													prefix={<LockOutlined className='mr-3 text-gray-300' />}
													{...field}
													size='large'
												/>
											</Form.Item>
										)}
									/>
								</div>
								<div>
									<label
										htmlFor='repassword'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Nhập lại mật khẩu
									</label>

									<Controller
										name='repassword'
										control={control}
										render={({field}) => (
											<Form.Item
												name='repassword'
												hasFeedback
												rules={[validateRequired(MESSAGE_REQUIRE.REPASSWORD)]}>
												<Input.Password
													placeholder='Vui lòng nhập'
													className='border-rose-400 '
													prefix={<LockOutlined className='mr-3 text-gray-300' />}
													{...field}
													size='large'
												/>
											</Form.Item>
										)}
									/>
								</div>
								<div className='col-span-2'>
									<label
										htmlFor='address'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
										Địa chỉ
									</label>

									<Controller
										name='address'
										control={control}
										render={({field}) => (
											<Form.Item
												name='address'
												hasFeedback
												rules={[validateRequired(MESSAGE_REQUIRE.ADDRESS)]}>
												<Input
													placeholder='Tp Hồ Chí Minh'
													className='border-rose-400 '
													prefix={<HomeOutlined className='mr-3 text-gray-300' />}
													{...field}
													size='large'
												/>
											</Form.Item>
										)}
									/>
								</div>
								<div className='col-span-2'>
									{!repassword && <Alert message={REPASSWORD_ERROR} type='error' />}
									{error.logging && <Alert message={MESSAGE_LOGIN_ERROR} type='error' />}
								</div>
								<Button
									size='large'
									type='primary w-full'
									className='bg-rose-500 hover:bg-rose-400'
									htmlType='submit'>
									<LoginOutlined />
									ĐĂNG NHẬP
								</Button>
								<p className='text-sm font-light text-gray-500 dark:text-gray-400 '>
									Bạn muốn đăng nhập ? &nbsp;
									<a
										href='#s'
										className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
										Đăng nhập
									</a>
								</p>
							</Form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
