
import { Divider, Dropdown, theme} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
const {useToken} = theme;
const items = [
	{
		key: '1',
		label: (
			<a  target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
				Thông tin
			</a>
		),
	},

	{
		key: '3',
		label: (
			<a
				target='_blank'
				rel='noopener noreferrer'
				href='https://www.luohanacademy.com'>
				Tin nhắn
			</a>
		),
	},
	{
		key: '2',
		label: (
			<a
				target='_blank'
				rel='noopener noreferrer'
				href='https://www.luohanacademy.com'>
				Thanh toán
			</a>
		),
	},
	{
		key: '4',
		danger: true,
		label: 'Đăng xuất',
	},
];
const BaseDropdown = ({children}) => {
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
					{React.cloneElement(menu, {
						style: menuStyle,
					})}
					<Divider
						style={{
							margin: 0,
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
