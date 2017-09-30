import React, {Component} from "react"

import FeatherIcon from "./FeatherIcon"
import bulma       from "../../../style/bulma"

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.onChange       = this.onChange.bind(this)
        this.toggleExpanded = this.toggleExpanded.bind(this)

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
            randID: `Select-${Math.floor(Math.random() * 100000)}`,
            expanded: false
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
        const change = (value, childs) => event => {
            this.onChange(value, childs, event)
            this.setState({
                expanded: false
            })
        }
        const childElements = children.map((child, childI) =>
            <a className={bulma.dropdown_item} value={child.props.value} key={childI}
               onClick={change(child.props.value, child.props.children)}>
                {child.props.children}
            </a>
            /*
            <option key={childI} value={child.props.value}>
                {child.props.children}
            </option>
            */
        )
        const label = this.props.noExteriorLabel ? null :
            <label className={bulma.label}>{this.props.label}</label>
            /*
        return <div className={bulma.field}>
            {label}
            <div className={`${bulma.control} ${bulma.select}`}>
                <select onChange={ev => change(ev.target.value, "")(ev)}>
                    {childElements}
                </select>
            </div>
        </div>*/

        const randID = Math.random()
        return <div className={`${bulma.dropdown} ${this.state.expanded ? bulma.is_active : ""}`}>
            <div>
                <button className={bulma.button} aria-haspopup="true" aria-controls="dropdown-menu"
                        onClick={this.toggleExpanded}>
                    <span>{this.state.label}</span>
                    <FeatherIcon icon="chevron-down"/>
                </button>
            </div>
            <div className={bulma.dropdown_menu} id={`dropdown-menu-${randID}`} role="menu">
                <div className={bulma.dropdown_content}>
                    {childElements}
                </div>
            </div>
        </div>

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

    toggleExpanded(expanded) {
        this.setState(state => ({
            expanded: !state.expanded
        }))
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
