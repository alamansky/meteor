/** @format */

import './Home.scss';

import React from 'react';
/* import { BrowserRouter, Route, Link, Switch } from "react-router-dom"; */
import { v4 as uuidv4 } from 'uuid';
//import update from 'immutability-helper';

import ProgressBar from '../ProgressBar/ProgressBar';
import Dial from '../Dial/Dial';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import Slider from '../Slider/Slider';
import Signin from '../Signin/Signin';
import Inner from '../Inner/Inner';
import Counter from '../Counter/Counter';
import Menu from '../Menu/Menu';
import NoMobile from '../NoMobile/NoMobile';

import postJSONToEndpoint from '../../util/postJSONToEndpoint';
import env from '../../../env';

export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sessionID: null,
			sessionLength: 5,
			fsr: null,
			inputFocus: 0,
			currentRead: {
				read: [0, 0, 0, 0],
				userRead: [null, null, null, null],
				userReadScore: [null, null, null],
				correct: true,
			},
			history: [],
			historyMode: {
				inputsDisabled: false,
				pendingRead: {},
				activeHistoryIndex: null,
			},
			modal: {
				isActive: false,
				message: null,
			},
			validRead: true
		};

		this.generateNewRead = this.generateNewRead.bind(this);
		this.collectInput = this.collectInput.bind(this);
		this.listenForEnter = this.listenForEnter.bind(this);
		this.compareNumbers = this.compareNumbers.bind(this);
		this.updateInputFocus = this.updateInputFocus.bind(this);
		this.scoreRead = this.scoreRead.bind(this);
		this.updateModal = this.updateModal.bind(this);
		this.addReadToHistory = this.addReadToHistory.bind(this);
		this.loadReadFromHistory = this.loadReadFromHistory.bind(this);
		this.toggleInputs = this.toggleInputs.bind(this);
		this.exitHistoryMode = this.exitHistoryMode.bind(this);
		this.liftSigninState = this.liftSigninState.bind(this);
		this.submitResults = this.submitResults.bind(this);
		this.recordResults = this.recordResults.bind(this);
		this.clearResults = this.clearResults.bind(this);
	}

	updateInputFocus(index) {
		if (index >= 0) {
			this.setState((state) => {
				return {
					...state,
					inputFocus: index,
				};
			});
		}
	}

	generateNewRead() {
		let newRead = [];
		for (var i = 0; i < 4; ++i) {
			newRead.push(Math.floor(Math.random() * Math.floor(9)));
		}
		this.setState((state) => {
			return {
				...state,
				currentRead: {
					...state.currentRead,
					read: newRead,
				},
			};
		});
	}

	collectInput(e) {
		let inputFocus = Number(document.activeElement.tabIndex);
		let nextInputFocus = inputFocus + 1;
		this.updateInputFocus(nextInputFocus);

		let newUserReadScore = this.state.currentRead.userReadScore;
		newUserReadScore[inputFocus] = e.target.value == this.state.currentRead.read[inputFocus];
		this.setState((state) => {
			return {
				...state,
				currentRead: {
					...state.currentRead,
					userReadScore: newUserReadScore,
				},
			};
		});

		let newUserRead = this.state.currentRead.userRead;
		newUserRead[inputFocus] = Number(e.target.value);
		this.setState((state) => {
			return {
				...state,
				currentRead: {
					...state.currentRead,
					userRead: newUserRead,
				},
			};
		});
	}

	scoreRead(readCorrect) {
		this.setState((state) => {
			return {
				...state,
				currentRead: {
					...state.currentRead,
					correct: readCorrect,
				},
			};
		});
	}

	compareNumbers() {
		var x = this.state.currentRead.read;
		var y = this.state.currentRead.userRead;
		if (y.includes(null)) {
			return 'NAN'
		} else {
			return x.every((x, i) => x == y[i]);
		}
	}

	updateModal(message, isActive) {
		this.setState(() => {
			return {
				modal: {
					message: message,
					isActive: isActive,
				},
			};
		});
	}

	toggleInputs(active) {
		this.setState((state) => {
			return {
				historyMode: {
					...state.historyMode,
					inputsDisabled: active,
				},
			};
		});
	}

	loadReadFromHistory(e) {
		let readIndex = Number(e.target.dataset.index);
		if (this.state.historyMode.inputsDisabled == false) {
			this.setState((state) => {
				return {
					historyMode: { ...state.historyMode, pendingRead: state.currentRead },
				};
			});
		}
		this.setState((state) => {
			return {
				...state,
				historyMode: { ...state.historyMode, activeHistoryIndex: readIndex },
				currentRead: { ...state.history[readIndex] },
			};
		});
		this.updateModal(3, true);
		this.toggleInputs(true);
	}

	addReadToHistory() {
		let newState = this.state.history.concat([this.state.currentRead]);
		this.setState({ history: newState }, () => this.recordResults());

	}

	recordResults() {
		const hasWindow = Boolean(window);

		if (hasWindow) {
			window.sessionStorage.setItem('currentSession', JSON.stringify(this.state.history));
		}

	}

	clearResults() {
		const hasWindow = Boolean(window);

		if (hasWindow) {
			if (confirm('Are you sure you want to resest? Your current progress will not be saved or submitted.')) {
				window.sessionStorage.clear();
				this.setState({
					fsr: '',
					history: [], currentRead: {
						...this.state.currentRead,
						userRead: [null, null, null, null],
						userReadScore: [null, null, null],
						correct: true,
					}, modal: { isActive: false, message: null },
				});
				this.setState({ sessionID: uuidv4() }, (state) => window.sessionStorage.setItem('currentSessionID', this.state.sessionID));
				this.generateNewRead();
				this.updateInputFocus(0);
				/* this.updateModal(4, true); */
				return true;
			}
		}
	}

	submitResults() {
		const hasWindow = Boolean(window);

		if (hasWindow) {
			if (confirm(`Ready to submit ${this.state.history.length} reads?`)) {
				let api = env.dev ? 'http://localhost:3000/read' : 'https://meteor-backend.herokuapp.com/read';
				let body = { history: this.state.history, sessionID: this.state.sessionID, fsr: this.state.fsr };
				postJSONToEndpoint(api, body);
				window.sessionStorage.clear();
				this.setState({ history: [] });
				this.setState({ sessionID: uuidv4() }, (state) => window.sessionStorage.setItem('currentSessionID', this.state.sessionID));
				//this.generateNewRead();
				this.updateModal(5, true);
			}
		}
	}

	exitHistoryMode() {
		this.updateModal('', false);
		this.setState((state) => {
			return {
				...state,
				historyMode: { ...state.historyMode, activeHistoryIndex: null, inputsDisabled: false },
				currentRead: state.historyMode.pendingRead,
			};
		});
		this.updateInputFocus(this.state.inputFocus);
	}

	listenForEnter(e) {
		if (this.state.fsr) {
			if (this.state.modal.isActive) {
				this.updateInputFocus(0);
				this.clear();
				if (this.state.validRead) {
					this.generateNewRead();
				}
				this.updateModal(null, false);
				this.setState({ validRead: true });
			} else if (e.keyCode == 13) {
				if (this.compareNumbers() === 'NAN') {
					this.setState({ validRead: false });
					this.updateModal(6, true);
					return;
				} else if (this.compareNumbers()) {
					if (this.state.history.length == 99) {
						this.updateModal(7, true);
					} else {
						this.updateModal(1, true);
					}
					this.scoreRead(true);
				} else {
					if (this.state.history.length == 99) {
						this.updateModal(8, true);
					} else {
						this.updateModal(2, true);
					}
					this.scoreRead(false);
				}
				this.addReadToHistory();
			} else if (e.keyCode == 8) {
				e.preventDefault();
				this.updateInputFocus(this.state.inputFocus - 1);
			} else if (e.keyCode == 9) {
				e.preventDefault();
				this.updateInputFocus(this.state.inputFocus + 1);
			}
		}
	}

	clear() {
		this.updateInputFocus(0);
		this.setState((state) => {
			return {
				...state,
				currentRead: { ...state.currentRead, userRead: Array(4).fill(null) },
			};
		});
	}

	componentDidMount() {
		window.addEventListener('keydown', this.listenForEnter);
		this.updateInputFocus(0);
		this.generateNewRead();

		let currentSession = sessionStorage.getItem('currentSession');
		let currentSessionID = sessionStorage.getItem('currentSessionID');
		if (currentSession && currentSessionID) {
			this.setState({ history: JSON.parse(currentSession), sessionID: currentSessionID });
		} else {
			this.setState({ sessionID: uuidv4() }, (state) => window.sessionStorage.setItem('currentSessionID', this.state.sessionID));
		}
	}

	liftSigninState(childfsr) {
		this.setState({ fsr: childfsr });
	}

	render() {
		return (
			<Inner>
				<NoMobile></NoMobile>
				<Signin liftState={this.liftSigninState} count={this.state.history.length} clearResults={this.clearResults} submitResults={this.submitResults}>
					<div className='app'>
						<ProgressBar
							progress={this.state.history}
							correctRead={this.state.currentRead.correct}
							handleClick={this.loadReadFromHistory}
							activeHistoryIndex={this.state.historyMode.activeHistoryIndex}
						/>
						<Dial value={this.state.currentRead.read} number={4} />
						<Input
							value={this.state.currentRead.userRead}
							collectInput={this.collectInput}
							isDisabled={this.state.historyMode.inputsDisabled}
							inputFocus={this.state.inputFocus}
							number={4}
						/>
						<Slider inputFocus={this.state.inputFocus} />
						<Modal
							message={this.state.modal.message}
							active={this.state.modal.isActive}
							handleToggle={this.updateModal}
							activeHistoryIndex={this.state.historyMode.activeHistoryIndex}
							exitHistoryMode={this.exitHistoryMode}
							currentRead={this.state.currentRead}
							inputFocus={this.state.inputFocus}
						/>
						{/* <Menu clearResults={this.clearResults} submitResults={this.submitResults} /> */}
					</div>
				</Signin>
			</Inner>

		);
	}
}
