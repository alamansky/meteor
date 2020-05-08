
import './Accordion.scss';
import React, { Component } from 'react'

export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    render() {
        return (
            <div className='accordion' onClick={() => this.setState({ open: !this.state.open })}>
                <p className="accordion__title">{this.props.title}</p>
                {this.state.open && this.props.children}
            </div>
        )
    }
}
