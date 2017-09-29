import React, {Component} from "react"

import bulma from "../../../style/bulma"

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)

        const label = (() => {
            const def = this.props.label || ""
            if(this.props.defaultValue) {
                return this.children().filter(child =>
                    child.props.value === this.props.defaultValue
                ).map(child => child.props.children)[0] || def
            } else {
                return def
            }
        })()

        this.state = {
            label,
            randID: `Select-${Math.floor(Math.random() * 100000)}`
        }
    }

    componentDidMount() {
        /*
        $(`#${this.state.randID}`).dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: true,
            hover: false,
            gutter: 0,
            belowOrigin: false,
            alignment: "left",
            stopPropagation: false
        })*/
    }

    render() {
        const children = this.children()
        const change = (value, childs) => event =>
            this.onChange(value, childs, event)
        const childElements = children.map((child, childI) =>
            <option key={childI} value={child.props.value}>
                {child.props.children}
            </option>
        )
        const label = this.props.noExteriorLabel ? null :
            <label className={bulma.label}>{this.props.label}</label>
        return <div className={bulma.field}>
            {label}
            <div className={`${bulma.control} ${bulma.select}`}>
                <select onChange={ev => change(ev.target.value, "")(ev)}>
                    {childElements}
                </select>
            </div>
        </div>

        /*
        return <div className={bulma.select}>
            <span>{this.props.label}</span>

            <select onChange={ev => change(ev.target.value, "")(ev)}>
                {childElements}
            </select>
        </div>
        */

        /*
        const children = this.children()
        const labelID = `${this.state.randID}-lbl`
        const change = (value, childs) => event =>
            this.onChange(value, childs, event)
        const childElements = children.map((child, childI) =>
            <li key={childI}>
                <a onClick={change(child.props.value,
                                   child.props.children)}>
                    {child}
                </a>
            </li>
        )
        return <div>
            <a className="dropdown-button btn"
               id={this.state.randID}
               data-activates={labelID}>{this.state.label}</a>
            <ul id={labelID} className="dropdown-content">
                {childElements}
            </ul>
        </div>
        */
    }

    onChange(value, children, event) {
        const child = !Array.isArray(children) ? children : children[0]
        const label = child.toString()
        this.setState({label})
        return this.props.onChange(value)
    }

    children() {
        return !this.props.children                ? [] :
               !Array.isArray(this.props.children) ? [this.props.children] :
               this.props.children
    }
}
