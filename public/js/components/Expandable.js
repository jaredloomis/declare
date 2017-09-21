import React       from "react"
import {withState} from "recompose"

const enhance = withState("expanded", "setExpanded", false)

export default (ControlComponent, DisplayElement) => props => {
    return <div>
        <div onClick={event => props.setExpanded(!props.expanded)}>
            <ControlComponent/>
        </div>
        {props.expanded? <DisplayElement/> : null}
    </div>
}
