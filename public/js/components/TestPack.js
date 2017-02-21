import React, {Component, PropTypes} from "react"
import Field from "./Field"

import "../../style/TestPack.scss"

export default class TestPack extends Component {
    constructor(props) {
        super(props)

        this.state = {
            values: props.values
        }
    }

    render() {
        const form = Object.keys(this.props.fields).map(name => {
            const field = this.props.fields[name]
            return <Field {...field} key={name}/>
            // Text field
            /*
            if(field.type === "text") {
                return <FieldText name={field.name}
                                  onChange={this.props.onChange}
                                  key={name}/>
            }
            // "Many" field
            else if(typeof(field.type) === "object") {
                return <FieldMany name={field.name}
                                  fields={field.type}
                                  onChange={this.props.onChange}
                                  key={name}/>
            }
            */
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
}
