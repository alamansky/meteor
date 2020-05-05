/** @format */

import './ProgressBar.scss';

import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressBar(props) {
	let ProgressBar = [];
	for (let i = 0; i < props.progress.length; ++i) {
		ProgressBar.push(
			<div
				className={`progress-bar__increment ${
					props.progress[i].correct ? 'progress-bar__increment--correct' : 'progress-bar__increment--incorrect'
					} ${props.activeHistoryIndex == i && 'progress-bar__increment--active'}`}
				onClick={props.handleClick || null}
				data-index={i}
				key={i}
			/>,
		);
	}
	return <div className='progress-bar'>{ProgressBar}</div>;
}

ProgressBar.propTypes = {
	progress: PropTypes.array,
	correctRead: PropTypes.bool,
	handleClick: PropTypes.func,
	activeHistoryIndex: PropTypes.number,
};
