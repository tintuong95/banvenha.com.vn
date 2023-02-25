'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import BaseIcon from './BaseIcon';
import {LoginIcon, UserIcon} from '../contants/icon';
import {useAppContext} from '../context/AppContext';
import {SET_LOGOUT} from '../context/action';

function BtnLogin(props) {
	const {state, dispatch} = useAppContext();
	const onLogout = () => {
		dispatch({type: SET_LOGOUT});
	};
	return (
		<>
			{!state.isLogin ? (
				<Link
					href={'/login'}
					type='text'
					className='flex gap-2 items-center  py-1   border-2 border-white bg-white px-3 rounded '>
					ĐĂNG NHẬP
					<BaseIcon width={20} icon={LoginIcon} name={'login icon'} />
				</Link>
			) : (
				<Link href={{pathname: '/'}}>
					<div className='dropdown'>
						<button
							type='text'
							className='flex gap-2 items-center  py-1   border-2 border-rose-500 shadow bg-rose-400 text-white px-3 rounded '>
							<BaseIcon icon={UserIcon} name={'user icon'} />
							{state.user.displayName}
						</button>
						<div className='z-10 dropdownHover hidden hover:block '>
							<div className='h-3 opacity-100'></div>
							<div
								className='text-sm overflow-hidden bg-white divide-y  divide-gray-100 rounded-lg shadow w-44  text-gray-700 '
								aria-labelledby='dropdownHoverButton'>
								<a
									href='#a'
									className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
									Thông tin
								</a>

								<a
									href='#a'
									className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
									Lịch sử
								</a>

								<p
									href='#a'
									className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
									Giỏ hàng
								</p>

								<p
									aria-hidden
									onClick={onLogout}
									className='block px-4 py-2 hover:bg-red-500 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white'>
									Đăng xuất
								</p>
							</div>
						</div>
					</div>
				</Link>
			)}
		</>
	);
}

BtnLogin.propTypes = {};

export default BtnLogin;
