import BaseFooter from '../components/BaseFooter';
import BaseHeader from '../components/BaseHeader';
import '../styles/base.css';
import PropTypes from 'prop-types';

export default function RootLayout({children}) {
	return (
		<html lang='en'>
			<head>{/* header */}</head>
			<body className='bg-gray-50'>
				
				<BaseHeader />
				<main className='m-auto '>{children}</main>
				<BaseFooter />
			</body>
		</html>
	);
}

RootLayout.propTypes = {
	children: PropTypes.node,
};
