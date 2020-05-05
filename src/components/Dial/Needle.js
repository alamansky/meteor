/** @format */

import React from 'react';
import PropTypes from 'prop-types';

export default function Needle(props) {
	var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var fraction = Number.parseFloat((props.fraction / 10) * 0.1).toFixed(2);
	var op = props.clockwise ? '+' : '-';
	return (
		<React.Fragment>
			<div
				className='dial__needle'
				style={{ transform: `rotate(calc(90deg ${op} .${props.value}turn ${op} ${fraction}turn))` }}
			/>
			{numbers.map((number, index) => (
				<React.Fragment key={index}>
					<div className='dial__number' style={{ transform: `rotate(calc(90deg ${op} .${number}turn))` }}>
						<span
							className='dial__digit'
							style={{
								transform: `rotate(calc(-90deg ${op == '+' ? '-' : '+'} .${number}turn))`,
							}}
						>
							{number}
						</span>
					</div>
					<div className='dial__tick' style={{ transform: `rotate(calc(90deg + .${number}turn))` }} />
				</React.Fragment>
			))}
		</React.Fragment>
	);
}

Needle.propTypes = {
	fraction: PropTypes.number,
	clockwise: PropTypes.bool,
	value: PropTypes.number,
};
