
import BaseFooter from '../components/BaseFooter';
import BaseHeader from '../components/BaseHeader';
import '../styles/base.css';
import PropTypes from 'prop-types';
import { AppContextProvider, } from '../context/AppContext';


export default function RootLayout({children}) {

	return (
		<html lang='en'>
			<head>{/* header */}</head>
			<body className='bg-gray-50'>
				<AppContextProvider>
					<BaseHeader />
					<main className='m-auto '>{children}</main>

					<BaseFooter />
				</AppContextProvider>
			</body>
		</html>
	);
}

RootLayout.propTypes = {
	children: PropTypes.node,
};
