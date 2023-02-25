import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import About from '../pages/partner/About';
import AccountDetails from '../pages/partner/Account/AccountDetails';
import DashBoard from '../pages/partner/DashBoard/DashBoard';
import MessageList from '../pages/partner/Message/MessageList';
import NewsCreate from '../pages/partner/News/NewsCreate';
import NewsDetails from '../pages/partner/News/NewsDetails';
import NewsList from '../pages/partner/News/NewsList';
import NewsUpdate from '../pages/partner/News/NewsUpdate';
import OrderDetails from '../pages/partner/Orders/OrderDetails';
import OrderList from '../pages/partner/Orders/OrderList';
import PartnerList from '../pages/partner/Partner/PartnerList';
import PaymentDetails from '../pages/partner/Payments/PaymentDetails';
import PaymentList from '../pages/partner/Payments/PaymentList';
import ProductCreate from '../pages/partner/Product/ProductCreate';
import ProductList from '../pages/partner/Product/ProductList';
import ProductUpdate from '../pages/partner/Product/ProductUpdate';

export const partnerRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '/',
			element: <DashBoard />,
		},
		{
			path: '/products',
			element: <ProductList />,
		},
		{
			path: '/product/create',
			element: <ProductCreate />,
		},
		{
			path: '/product/:id/update',
			element: <ProductUpdate />,
		},
		{
			path: '/news',
			element: <NewsList />,
		},
		{
			path: '/news/create',
			element: <NewsCreate />,
		},
		{
			path: '/news/:id/update',
			element: <NewsUpdate />,
		},
		{
			path: '/news/:id/details',
			element: <NewsDetails />,
		},
		{
			path: '/orders',
			element: <OrderList />,
		},
		{
			path: '/order/:id/details',
			element: <OrderDetails />,
		},
		{
			path: '/partners',
			element: <PartnerList />,
		},
		{
			path: '/messages',
			element: <MessageList />,
		},
		{
			path: '/about',
			element: <About />,
		},
		{
			path: '/account/details',
			element: <AccountDetails />,
		},
		{
			path: '/payments',
			element: <PaymentList />,
		},
		{
			path: '/payment/:id/details',
			element: <PaymentDetails />,
		},
	],
};
