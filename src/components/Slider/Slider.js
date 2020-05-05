/** @format */

import './Slider.scss';

import React from 'react';
import PropTypes from 'prop-types';

export default class Slider extends React.Component {
	componentDidUpdate() {
		var nextDial = this.props.inputFocus;
		if (nextDial == 4) {
			return;
		} else {
			let sliderOffset = `-${nextDial * 100}%`;
			document.documentElement.style.setProperty('--so', sliderOffset);
		}
	}

	render() {
		return (
			<div className='slider'>
				<div className='slider__check'>+</div>
				<div className='slider__check'>+</div>
				<div className='slider__check'>+</div>
				<div className='slider__check'>+</div>

				<div className='slider__arrow'>^</div>
			</div>
		);
	}
}

Slider.propTypes = {
	inputFocus: PropTypes.number,
};
