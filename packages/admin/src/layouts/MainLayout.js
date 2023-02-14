import {UserOutlined, Loading3QuartersOutlined} from '@ant-design/icons';
import {Avatar, Badge, Breadcrumb, Divider, Layout, Menu, Spin} from 'antd';
import {useEffect, useState} from 'react';
import {Outlet, Link} from 'react-router-dom';
import BaseDropdown from '../components/BaseDropDown';
import {IoHomeOutline} from 'react-icons/io5';
import {RiProductHuntLine} from 'react-icons/ri';
import {BsNewspaper} from 'react-icons/bs';
import {FaOpencart} from 'react-icons/fa';
import {MdGroups, MdOutlinePayment} from 'react-icons/md';
import {BiMessageSquareDots} from 'react-icons/bi';
import BaseIcon from '../components/BaseIcon';
import {useSelector} from 'react-redux';
import Loading from '../pages/auth/Loading';

import {useMitt} from 'react-mitt';
import {ROLE} from '../contants/auth';
import BaseHeader from '../components/BaseHeader';

const {Header, Content, Sider} = Layout;

const antIcon = (
	<Loading3QuartersOutlined type='reload' style={{fontSize: 24}} spin />
);
const MainLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {role, loading} = useSelector((state) => state.auth);
	const {emitter} = useMitt();
	const [pending, setPending] = useState(false);
	// listen to an event

	useEffect(() => {
		// listen and respond to 'foo' events
		emitter.on('pendingOn', (e) => setPending(true));
		emitter.on('pendingOff', (e) => setPending(false));
	}, []);
	return (
		<>
			{loading ? <Loading /> : ''}
			{pending ? (
				<div className='bg-blue-500 bg-opacity-10 fixed w-screen h-screen flex items-center justify-center  z-50'>
					<Spin
						indicator={antIcon}
						size='large'
						tip='Loading...'
						className='mb-20'
					/>
				</div>
			) : (
				''
			)}

			<Layout
				className='z-10'
				style={{
					minHeight: '100vh',
				}}>
				<Sider
					className='border-r shadow-md'
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}>
					<div
						style={{
							height: 32,
							margin: 16,
							background: 'rgba(0, 0, 0, 0.2)',
						}}
					/>
					<Menu theme='light' mode='inline' className='p-2'>
						<Menu.Item>
							<Link to={'/'} className='flex items-center gap-2'>
								<BaseIcon color='#60a5fa' size={24}>
									<IoHomeOutline />
								</BaseIcon>
								Trang chủ
							</Link>
						</Menu.Item>
					<Divider/>
						<Menu.Item>
							<Link to={'/products'} className='flex items-center gap-2'>
								<BaseIcon color='#60a5fa' size={24}>
									<RiProductHuntLine />
								</BaseIcon>
								Sản phẩm
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to={'/news'} className='flex items-center gap-2'>
								<BaseIcon color='#60a5fa' size={24}>
									<BsNewspaper />
								</BaseIcon>
								Tin tức
							</Link>
						</Menu.Item>

						<Divider />
						<Menu.Item>
							<Link to={'/orders'} className='flex items-center gap-2'>
								<BaseIcon color='#60a5fa' size={24}>
									<FaOpencart />
								</BaseIcon>
								Đơn hàng
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to={'/payments'} className='flex items-center gap-2'>
								<BaseIcon color='#60a5fa' size={24}>
									<MdOutlinePayment />
								</BaseIcon>
								Thanh toán
							</Link>
						</Menu.Item>
						<Divider />

						{role == ROLE.ADMIN ? (
							<Menu.Item>
								<Link to={'/partners'} className='flex items-center gap-2'>
									<BaseIcon color='#60a5fa' size={24}>
										<MdGroups />
									</BaseIcon>
									Đối tác
								</Link>
							</Menu.Item>
						) : null}
						<Menu.Item>
							<Link to={'/messages'} className='flex items-center gap-2'>
								<BaseIcon color='#60a5fa' size={24}>
									<BiMessageSquareDots />
								</BaseIcon>
								Tin Nhắn
							</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className='site-layout'>
					<BaseHeader/>
					<Content className='p-7 z-10'>
						{/* content */}
						<Outlet />
						{/* content */}
					</Content>
					{/* <FloatButton.Group shape='circle' style={{right: 24}}>
					<FloatButton icon={<QuestionCircleOutlined />} />
					<FloatButton />
					<FloatButton.BackTop visibilityHeight={0} />
				</FloatButton.Group> */}
				</Layout>
			</Layout>
		</>
	);
};
export default MainLayout;
