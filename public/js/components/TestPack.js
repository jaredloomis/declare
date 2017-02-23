import React, {Component} from "react"
import Field from "./Field"

import "../../style/TestPack.scss"

export default class TestPack extends Component {
    constructor(props) {
        super(props)
        this.fieldChange = this.fieldChange.bind(this)

        this.state = {
            values: props.values
        }
    }

    render() {
        const form = Object.keys(this.props.fields).map(id => {
            const field = this.props.fields[id]
            return <Field uid={this.fieldUID(id)}
                          type={field.type}
                          options={field.options}
                          onChange={this.fieldChange}
                          key={id}/>
        })

        return <div className="test-pack card">
            <div className="card-content">
                <span className="test-pack-name card-title">
                    {this.props.name}
                </span>
                <div className="test-pack-form">
                    {form}
                </div>
            </div>
        </div>
    }

    fieldUID(id) {
        return `${this.props.packID}.${id}`
    }

    fieldChange(id) {
        return event => {
            const value = event.target.value
            this.setState(state => {
                console.log(`Set ${id} to ${value}`)
                assign(state, id, value)
                console.log(JSON.stringify(state))
                return state
            })
        }
    }
}

// TODO Implement efficiently; this uses recursion
function assign(obj, prop, value) {
    if(typeof(prop) === "string") {
        // Convert indexes to properties
        prop = prop.replace(/\[(\w+)\]/g, ".$1")
        // Strip leading dot
        //prop = prop.replace(/^\./, "")
        // Convert to array of props
        prop = prop.split(".")
    }

    if(prop.length > 1) {
        const e = prop.shift()
        assign(obj[e] =
            Object.prototype.toString.call(obj[e]) === "[object Object]" ?
                obj[e] :
                {},
               prop,
               value
        )
    } else {
        obj[prop[0]] = value
    }
}
