import React, {Component} from "react"
import Field from "./Field"

import "../../style/TestPack.scss"

export default class TestPack extends Component {
    constructor(props) {
        super(props)
        this.fieldChange = this.fieldChange.bind(this)
        this.fieldUID    = this.fieldUID.bind(this)
    }

    render() {
        const form = Object.keys(this.props.fields).map(id => {
            const field = this.props.fields[id]
            const uid   = this.fieldUID(id)
            return <Field uid={uid}
                          type={field.type}
                          options={field.options}
                          onChange={this.props.onChange(uid)}
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
        return this.props.onChange(`${id}`)
    }
}
