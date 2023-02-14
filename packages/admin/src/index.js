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
import {CustomRouter, history} from './routes';

import {MittProvider} from 'react-mitt';
import {ErrorBoundary} from './pages/error/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<CustomRouter history={history}>
		<Provider store={store}>
			<MittProvider>
				<ErrorBoundary>
					<AppRouter />
				</ErrorBoundary>
			</MittProvider>
		</Provider>
	</CustomRouter>
);
