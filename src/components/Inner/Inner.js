import './Inner.scss';

import React from 'react'

const Inner = (props) => {
    return (
        <div className="inner">
            {props.children}
        </div>
    )
}

export default Inner;
