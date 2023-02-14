import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Badge, Breadcrumb, Layout} from 'antd';
import BaseDropdown from './BaseDropDown';
import {UserOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';

const {Header} = Layout;

function BaseHeader() {
	const {self} = useSelector((state) => state.auth);

	return (
		<Header className='border-b flex justify-between items-center '>
			<Breadcrumb>
				<Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
				<Breadcrumb.Item>Bill</Breadcrumb.Item>
			</Breadcrumb>
			<div className='flex gap-5'>
				<span>Hi ! {self.name}</span>
				<span className='avatar-item'>
					<BaseDropdown>
						<Badge count={1}>
							<Avatar shape='square' icon={<UserOutlined />} />
						</Badge>
					</BaseDropdown>
				</span>
			</div>
		</Header>
	);
}

BaseHeader.propTypes = {};

export default BaseHeader;
