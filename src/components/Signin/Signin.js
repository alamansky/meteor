import React, { Component } from 'react'
import './Signin.scss';
import Counter from '../Counter/Counter';
import Menu from '../Menu/Menu';

export default class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            disabled: false,
            fsr: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
        this.focusFSRInput = this.focusFSRInput.bind(this);
    }

    componentDidMount() {
        this.fsrInput.focus();
        let hasWindow = Boolean(window);
        if (hasWindow) {
            let fsr = sessionStorage.getItem('currentSessionFSR');
            if (fsr) {
                this.setState({ disabled: true, fsr: fsr, open: true }, () => this.props.liftState(this.state.fsr));
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ open: true, disabled: true });
        this.props.liftState(this.state.fsr)
        let hasWindow = Boolean(window);
        if (hasWindow) {
            sessionStorage.setItem('currentSessionFSR', this.state.fsr);
        }
    }

    focusFSRInput() {
        let hasWindow = Boolean(window)
        window.setTimeout(() => this.fsrInput.focus(), 200);
    }

    logout() {
        if (this.props.clearResults()) {
            this.setState({ open: false, disabled: false, fsr: '' }, this.focusFSRInput());
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className='signin__header'>
                        <span className='signin__form'>
                            <form onSubmit={(e) => this.handleSubmit(e)}>
                                <fieldset>
                                    <label htmlFor='fsr'>
                                        <span>{`FSR:\t`}</span>
                                        <input title={this.state.disabled ? "Click reset button at bottom of screen to change FSR" : null} ref={(input) => { this.fsrInput = input; }} type='text' name='fsr' placeholder='Enter Your FSR Here' value={this.state.fsr} disabled={this.state.disabled} onChange={(e) => this.setState({ fsr: e.target.value })} />
                                    </label>
                                    <button className='button--primary' type='submit' disabled={this.state.disabled}>Start</button>
                                    {this.state.open && <Menu clearResults={this.logout} submitResults={this.props.submitResults} />}
                                </fieldset>
                            </form>
                        </span>
                        <Counter count={this.props.count} />

                    </div>
                    <div>
                        {this.state.open && this.props.children}
                    </div>
                </div>
                {/* {this.state.open && <Menu clearResults={this.logout} submitResults={this.props.submitResults} />} */}
            </React.Fragment>
        )
    }
}
