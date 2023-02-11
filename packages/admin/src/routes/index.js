import {Router} from 'react-router-dom';
import React, {useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

export const CustomRouter = ({basename, children, history}) => {
	const [state, setState] = React.useState({
		action: history.action,
		location: history.location,
	});

	useLayoutEffect(() => history.listen(setState), [history]);

	return (
		<Router
			basename={basename}
			location={state.location}
			navigationType={state.action}
			navigator={history}>
			{children}
		</Router>
	);
};

CustomRouter.propTypes = {
	basename: PropTypes.string,
	children: PropTypes.node,
	history: PropTypes.any,
};
