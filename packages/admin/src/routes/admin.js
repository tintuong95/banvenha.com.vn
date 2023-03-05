import AccountDetails from '../pages/admin/Account/AccountDetails';
import DashBoard from '../pages/admin/DashBoard/DashBoard';
import MessageList from '../pages/admin/Message/MessageList';
import NewsDetails from '../pages/admin/News/NewsDetails';
import NewsList from '../pages/admin/News/NewsList';
import OrderDetails from '../pages/admin/Orders/OrderDetails';
import OrderList from '../pages/admin/Orders/OrderList';
import PartnerDetails from '../pages/admin/Partner/PartnerDetails';
import PartnerList from '../pages/admin/Partner/PartnerList';
import PaymentList from '../pages/admin/Payments/PaymentList';
import ProductDetails from '../pages/admin/Product/ProductDetails';
import ProductList from '../pages/admin/Product/ProductList';

export const adminRoutes = [
	{
		path: '/',

		element: <DashBoard />,
	},
	{
		path: '/products',
		name: 'sản phẩm',
		element: <ProductList />,
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
		path: '/partner/:id/details',
		element: <PartnerDetails />,
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
		path: '/payments',
		element: <PaymentList />,
	},
];
