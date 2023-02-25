'use client';

import React, {useContext, useState} from 'react';
import { useThemeContext } from '../../context/AppContext';


export default  function page() {
	const {items, add, subtract} = useThemeContext();
	return (
		<>
			<button onClick={add}>add</button>
			<h1>{items}</h1>
			<button onClick={subtract}>subtract</button>
		</>
	);
}
