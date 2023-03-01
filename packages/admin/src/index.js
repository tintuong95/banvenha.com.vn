import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'antd/dist/reset.css';

// import {BrowserRouter} from 'react-router-dom';
// import { router } from './routes';
import './boostrap';
import AppRouter from './App';
import {Provider} from 'react-redux';
import {store} from './stores';

import {MittProvider} from 'react-mitt';
import {ErrorBoundary} from './pages/error/ErrorBoundary';
import {ConfigProvider} from 'antd';
import { CustomRouter, history } from './routes/history';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<CustomRouter history={history}>
		<Provider store={store}>
			<MittProvider>
				<ErrorBoundary>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: '#f43f5e',
								colorPrimaryText: '#f43f5e',
								colorLink: '#f43f5e',
								colorLinkHover: '#e11d48',
							},
						}}>
						<AppRouter />
					</ConfigProvider>
				</ErrorBoundary>
			</MittProvider>
		</Provider>
	</CustomRouter>
);
