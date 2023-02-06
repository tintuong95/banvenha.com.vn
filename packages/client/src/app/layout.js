'use client'
import BaseFooter from '../components/BaseFooter';
import BaseHeader from '../components/BaseHeader';
import '../styles/base.css'
import PropTypes from 'prop-types';
import { FloatButton } from 'antd';
import {CommentOutlined, CustomerServiceOutlined} from '@ant-design/icons';
export default function RootLayout({ children }) {
  return (
			<html lang='en'>
				<head>{/* header */}</head>
				<body className='bg-gray-100'>
					<BaseHeader />
					<main className='m-auto w-max-1250'>{children}</main>

					<BaseFooter />
					<FloatButton.Group
						trigger='click'
						type='primary'
						icon={<CustomerServiceOutlined />}>
						<FloatButton />
						<FloatButton icon={<CommentOutlined />} />
					</FloatButton.Group>
					<FloatButton.BackTop
						style={{
							right: 94,
						}}
					/>
				</body>
			</html>
		);
}


RootLayout.propTypes = {
	children: PropTypes.node
};