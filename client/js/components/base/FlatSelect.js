import React from "react"

import {compose, setDisplayName, withState} from "recompose"

import FeatherIcon from "./FeatherIcon"
import bulma       from "../../../style/bulma"
import style       from "../../../style/Select.scss"

const FlatSelectBase = props => {
    const click = () => {
        props.setExpanded(!props.expanded)
    }
    const change = value => {
        props.setExpanded(false)
        props.setSelectedValue(value)
        props.onChange(value)
    }

    const childArr = (() => {
        if(Array.isArray(props.children))
            return props.children
        else if(!props.children)
            return []
        else
            return [props.children]
    })()

    const selectedValue = props.selectedValue || props.defaultValue

    const childElements = childArr.map((child, childI) => {
        if(child.props.rawOption) {
            return child
        } else {
            const isSelected = child.props.value === selectedValue
            const klass = `${bulma.dropdown_item} ${isSelected ? bulma.is_active : ""}`

            return <a className={klass} value={child.props.value} key={childI}
                onClick={() => change(child.props.value, child.props.children)}>
                {child.props.children}
            </a>
        }
    })

    const selectedText = (() => {
        if(selectedValue) {
            for(const child of childArr) {
                if(child.props.value === selectedValue) {
                    return child.props.children
                }
            }
            return null
        } else {
            return null
        }
    })()

    return <div className={style.select}>
        <div className={`${bulma.dropdown} ${props.expanded ? bulma.is_active : ""}`}>
            <div>
                <button className={`${bulma.button} ${style.selectButton}`}
                        aria-haspopup="true" aria-controls="dropdown-menu"
                        onClick={click}>
                    <label className={selectedText ? style.activeLabel : ""}>
                        {props.label}
                    </label>
                    <span>{selectedText}</span>
                    <FeatherIcon icon="chevron-down"/>
                </button>
            </div>
            <div className={bulma.dropdown_menu} role="menu">
                <div className={bulma.dropdown_content}>
                    {childElements}
                </div>
            </div>
        </div>
    </div>
}

const enhance = compose(
    setDisplayName("FlatSelect"),
    withState("expanded",      "setExpanded",      false),
    withState("selectedValue", "setSelectedValue", null)
)

export default enhance(FlatSelectBase)
