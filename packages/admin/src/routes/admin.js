
import MainLayout from "../layouts/MainLayout";
import About from "../pages/admin/About";
import AccountDetails from "../pages/admin/Account/AccountDetails";
import DashBoard from "../pages/admin/DashBoard/DashBoard"
import MessageList from "../pages/admin/Message/MessageList";
import NewsCreate from "../pages/admin/News/NewsCreate";
import NewsDetails from "../pages/admin/News/NewsDetails";
import NewsList from "../pages/admin/News/NewsList";
import NewsUpdate from "../pages/admin/News/NewsUpdate";
import OrderList from "../pages/admin/Orders/OrderList";
import PartnerList from "../pages/admin/Partner/PartnerList";
import PaymentList from "../pages/admin/Payments/PaymentList";

import ProductCreate from "../pages/admin/Product/ProductCreate";
import ProductDetails from "../pages/admin/Product/ProductDetails";
import ProductList from "../pages/admin/Product/ProductList";
import ProductUpdate from "../pages/admin/Product/ProductUpdate";



export const adminRoutes = {
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
			path: '/product/:id/details',
			element: <ProductDetails />,
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
			path: '/partners',
			element: <PartnerList />,
		},
		{
			path: '/messages',
			element: <MessageList />,
		},
		{
			path: '/account/details',
			element: <AccountDetails />,
		},
		{
			path: '/about',
			element: <About />,
		},
		{
			path: '/payments',
			element: <PaymentList />,
		},
	],
};