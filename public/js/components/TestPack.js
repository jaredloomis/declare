import React, {Component} from "react"
import Field from "./Field"
import {deepGet} from "../lib/Deep"

import "../../style/TestPack.scss"

export default class TestPack extends Component {
    constructor(props) {
        super(props)
        this.fieldValue  = this.fieldValue.bind(this)
        this.fieldUID    = this.fieldUID.bind(this)
    }

    render() {
        const fields = this.props.fields || {}
        const form = Object.keys(fields).map(id => {
            const field = this.props.fields[id]
            const uid   = this.fieldUID(id)
            return <Field uid={uid}
                          type={field.type}
                          options={field.options}
                          defaultValue={this.fieldValue(uid)}
                          onChange={this.props.onChange}
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

    fieldValue(uid) {
        const [pageID, packID, ...selector] = uid.split(".")
        return deepGet(selector, this.props.values)
    }

    fieldUID(id) {
        return `${this.props.packID}.${id}`
    }
}
