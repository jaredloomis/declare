import React from "react"

import Button from "base/Button"


const Adder = ({text="+"}) => BaseComponent => props => {
    const AdderBase = props => {
        const onClick = event => {}
        return <div>
            <Button onClick={onClick}>{text}</Button>
        </div>
    }
    return AdderBase
}

export default Adder
