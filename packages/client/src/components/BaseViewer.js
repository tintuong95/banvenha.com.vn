import React from 'react';
import PropTypes from 'prop-types';
import Viewer from 'react-viewer';

function BaseViewer({images,visible,setVisible}) {
	console.log('images', images);

	return (
		<Viewer
			visible={visible}
			onClose={() => {
				setVisible(false);
			}}
			images={images}
			activeIndex={3}
		/>
	);
}

BaseViewer.propTypes = {
	images: PropTypes.array,
	visible: PropTypes.bool,
	setVisible: PropTypes.func,
};

export default BaseViewer;
