import './Counter.scss';

import React from 'react'

const Counter = (props) => {
    return (
        <div className="counter">
            {props.count}
        </div>
    )
}

export default Counter;