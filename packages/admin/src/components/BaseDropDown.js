import {Button, Divider, Dropdown, theme} from 'antd';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import {useDispatch} from 'react-redux';
import {evtLogout} from '../stores/reducers/auth';
const {useToken} = theme;

const BaseDropdown = ({children}) => {
	const dispatch = useDispatch();

		const onLogout = () => {
			dispatch(evtLogout());
		};
	const items = [
		{
			key: '1',
			label: (
				<span style={{width:400}} aria-hidden role='button' onClick={onLogout}>
					Thông tin
				</span>
			),
		},

		{
			key: '3',
			label: (
				<span aria-hidden role='button' onClick={onLogout}>
					Tin Nhắn
				</span>
			),
		},
		{
			key: '2',
			label: (
				<span aria-hidden role='button' onClick={onLogout}>
					Thanh toán
				</span>
			),
		},
		{
			key: '4',
			danger: true,
			label: (
				<div aria-hidden role='button' className='w-full h-full' onClick={onLogout}>
					Đăng xuất
				</div>
			),
		},
	];

	const {token} = useToken();
	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary,
	};
	const menuStyle = {
		boxShadow: 'none',
	};
	return (
		<Dropdown

			menu={{
				items,
			}}
			dropdownRender={(menu) => (
				<div style={contentStyle}>
					{cloneElement(menu, {
						style: menuStyle,
					})}
					<Divider
						style={{
							margin: 0,
							width:250
						}}
					/>
				</div>
			)}>
			<a href='#d' onClick={(e) => e.preventDefault()}>
				{children}
			</a>
		</Dropdown>
	);
};
export default BaseDropdown;

BaseDropdown.propTypes = {
	children: PropTypes.node,
};
