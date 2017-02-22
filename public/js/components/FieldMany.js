import React, {Component, PropTypes} from "react"
import Field from "./Field"

export default class FieldMany extends Component {
    constructor(props) {
        super(props)
        this.addInput = this.addInput.bind(this);

        this.state = {
            inputCount: 1
        }
    }

    render() {
        const singleForm = Object.keys(this.props.fields).map(name => {
            const field = this.props.fields[name]
            return <Field type={field.type}
                          options={field.options}
                          key={name}/>
        })

        const forms = [...Array(this.state.inputCount).keys()]
        .map(index =>
            <div className="field-many-form" key={index}>
                <div className="field-many-singular-name">
                    <span>
                        {this.props.singularName ||
                         this.props.name.slice(0, this.props.name.length-1)}
                    </span>
                </div>
                {singleForm}
            </div>
        )

        return <div className="field field-many">
            <div className="field-many-name">
                <span>{this.props.name}</span>
            </div>
            {forms}
            <button onClick={this.addInput} className="btn">
                +
            </button>
        </div>
    }

    addInput(event) {
        this.setState(state => {
            ++state.inputCount
            return state
        })
    }
}
