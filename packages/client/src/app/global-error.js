'use client'; // Error components must be Client components

import {useEffect} from 'react';
import PropTypes from 'prop-types';

export default function Error({error, reset}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}>
				Try again
			</button>
		</div>
	);
}


Error.propTypes = {
	error: PropTypes.any,
	reset: PropTypes.any,
};
