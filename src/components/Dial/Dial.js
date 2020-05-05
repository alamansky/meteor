/** @format */

import './Dial.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Needle from './Needle';

export default function Dial(props) {
	let numOfDials = Number(props.number);
	let Dials = [];

	for (let i = 0; i < numOfDials; ++i) {
		Dials.unshift(
			<div className='dial' key={i} >
				<Needle value={props.value[i]} fraction={props.value[i - 1] || 0} clockwise={i % 2 == 0 ? true : false} />
				<div className='dial__center'></div>
			</div>,
		);
	}
	return (
		<React.Fragment>
			<div className='index'>{Dials}</div>
		</React.Fragment>
	);
}

Dial.propTypes = {
	number: PropTypes.number,
	value: PropTypes.array,
};
