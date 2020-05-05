/** @format */

import './Input.scss';

import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
	constructor(props) {
		super(props);
		this.inputs = [];
		this.ref = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];

		this.changeFocus = this.changeFocus.bind(this);
	}

	componentDidUpdate() {
		this.changeFocus();
	}

	componentDidMount() {
		this.changeFocus();
	}

	changeFocus() {
		if (this.props.inputFocus < 4) {
			this.ref[this.props.inputFocus].current.focus();
			this.ref[this.props.inputFocus].current.select();
		}
	}

	render() {
		return (
			<React.Fragment>
				<form className='user-read-form'>
					{Array(4)
						.fill(null)
						.map((input, i) => (
							<input
								key={i}
								value={this.props.value[i] === 0 ? 0 : this.props.value[i] || ''}
								type='text'
								tabIndex={i}
								onChange={this.props.collectInput}
								disabled={this.props.isDisabled}
								ref={this.ref[i]}
								maxLength={1}
								className='user-read-form__input'
							/>
						))
						.reverse()}
				</form>
			</React.Fragment>
		);
	}
}

Input.propTypes = {
	value: PropTypes.array,
	number: PropTypes.number,
	collectInput: PropTypes.func,
	isDisabled: PropTypes.bool,
	inputFocus: PropTypes.number,
};
