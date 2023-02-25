'use client';
import React, {useEffect} from 'react';
import BaseIcon from '../../components/BaseIcon';
import {FacebookIcon, GoogleIcon} from '../../contants/icon';
import {FacebookAuthProvider, GoogleAuthProvider} from 'firebase/auth';
import useFireBase from '../../hooks/firebase';
import {useAppContext} from '../../context/AppContext';
import {SET_IS_LOGIN, SET_USER, SET_ACCESS_TOKEN} from '../../context/action';
import { redirect} from 'next/navigation';

const providerFacebook = new FacebookAuthProvider();

const providerGoogle = new GoogleAuthProvider();

providerFacebook.setCustomParameters({
	display: 'popup',
});
providerGoogle.setCustomParameters({
	display: 'popup',
});

export default function page() {
	const [user,accessToken, authGoogleAuth] = useFireBase();
	const {dispatch} = useAppContext();

	useEffect(() => {
		if (user) {
			dispatch({type: SET_IS_LOGIN, payload: true});
			dispatch({type: SET_USER, payload: user});
			dispatch({type: SET_ACCESS_TOKEN, payload: accessToken});
			redirect('/');
		}
	}, [user]);

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto my-10 lg:py-0'>
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
									Tài khoản
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
									required=''
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Mật khẩu
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required=''
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
											Remember me
										</label>
									</div>
								</div>
								<a
									href='#d'
									className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
									Forgot password?
								</a>
							</div>
							<button
								type='submit'
								className='w-full text-white bg-primary-600  focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium bg-rose-500 rounded-lg text-sm px-5 py-2.5 text-center '>
								Đăng nhập
							</button>
							<div className='grid grid-cols-2 gap-2'>
								<button
									onClick={() => {
										authGoogleAuth(providerGoogle);
									}}
									type='button'
									className='w-full col-span-1 border   focus:outline-none border-red-500 font-medium  rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-2'>
									<BaseIcon icon={GoogleIcon} name={'google icon'} /> Google
								</button>
								<button
									onClick={() => {
										authGoogleAuth(providerFacebook);
									}}
									type='button'
									className='w-full col-span-1 border focus:outline-none border-blue-600  font-medium  rounded-lg text-sm px-5 py-2.5 text-center   flex items-center gap-2'>
									<BaseIcon icon={FacebookIcon} name={'facebook icon'} /> Facebook
								</button>
							</div>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Don’t have an account yet?{' '}
								<a
									href='#f'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
									Sign up
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

page.propTypes = {};


