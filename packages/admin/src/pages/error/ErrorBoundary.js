import React from 'react';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';
import {FrownOutlined} from '@ant-design/icons';
import {  history} from '../../routes/history';

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false};
	}
	static getDerivedStateFromError(error) {
		return {hasError: true};
	}

	componentDidCatch(error, errorInfo) {
		console.log(error);
		console.log(errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='w-screen h-screen flex justify-center items-center'>
					<Result
						status='error'
						icon={<FrownOutlined color='gray' />}
						title='Oops! Hình như có gì đó sai sai ! '
						extra={<Button onClick={()=>{window.location.href="/"}} size='large' type="dashed" className='px-4' >Quay trở lại</Button>}
					/>
				</div>
			);
		}
		return this.props.children;
	}
}


ErrorBoundary.propTypes = {
	children: PropTypes.node,
};