/** @format */

import './Modal.scss';

import React from 'react';
import PropTypes from 'prop-types';
//import update from 'immutability-helper';

export default function Modal(props) {
	let active = props.active;
	let message = null;
	let x = null;

	function format(arg) {
		switch (arg) {
			case 1:
				return 'first';
			case 2:
				return 'second';
			case 3:
				return 'third';
			case 4:
				return 'fourth';
			default:
				null;
		}
	}

	switch (props.message) {
		case 1:
			message = (
				<React.Fragment>
					<h2 className='modal__header'>Correct</h2>
					<p>Press Enter to Continue</p>
				</React.Fragment>
			);
			break;
		case 2:
			x = props.currentRead.read
				.map(
					(dial, index) =>
						dial != props.currentRead.userRead[index] &&
						`You misread the ${format(index + 1)} dial.\n\n`,
				)
				.filter((item) => item != false);

			message = (
				<React.Fragment>
					<h2 className='modal__header'>Incorrect</h2>
					<p className='modal__body'>{x}</p>
					<p>Press Enter to Continue</p>
				</React.Fragment>
			);
			break;
		case 3:
			message = (
				<React.Fragment>
					<p>{`You are viewing read #${Number(props.activeHistoryIndex) + 1}`}</p>
					<p>{`This read was ${props.currentRead.correct ? 'correct' : 'incorrect'}`}</p>
					<button onClick={props.exitHistoryMode}>Resume</button>
				</React.Fragment>
			);
			break;
		case 4:
			message = (
				<React.Fragment>
					<h2 className='modal__header'>Session Reset</h2>
					<p>Press Enter to Continue</p>
				</React.Fragment>
			);
			break;
		case 5:
			message = (
				<React.Fragment>
					<h2 className='modal__header'>Session Submitted!</h2>
					<p>You may close this window or press enter to start another session.</p>
				</React.Fragment>
			)
		case 6:
			message = (
				<React.Fragment>
					<h2 className='modal__header'>Read Not Valid</h2>
					<p>Please enter a valid 4 digit read.</p>
					<p>Press Enter to Continue</p>
				</React.Fragment>
			)
		default:
			null;
	}

	return <React.Fragment>{active && <div className='modal'>{message}</div>}</React.Fragment>;
}

Modal.propTypes = {
	message: PropTypes.number,
	active: PropTypes.bool,
	handleToggle: PropTypes.func,
	activeHistoryIndex: PropTypes.number,
	exitHistoryMode: PropTypes.func,
	readCorrect: PropTypes.object,
};
