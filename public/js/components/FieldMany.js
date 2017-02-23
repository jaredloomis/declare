import React, {Component} from "react"
import Field from "./Field"

export default class FieldMany extends Component {
    constructor(props) {
        super(props)
        this.addInput = this.addInput.bind(this)

        this.state = {
            inputCount: 1
        }
    }

    render() {
        const singleForm = index => Object.keys(this.props.fields)
        .map(id => {
            const field = this.props.fields[id]
            return <Field uid={this.childUID(id, index)}
                          type={field.type}
                          options={field.options}
                          onChange={this.props.onChange}
                          key={id}/>
        })

        const forms = [...Array(this.state.inputCount).keys()]
        .map(index =>
            <div className="field-many-form" key={index}>
                <div className="field-many-singular-name">
                    <span>
                        {this.props.singularName ||
                         this.props.name.slice(0, this.props.name.length-1)}
                        &nbsp;
                        #{index+1}
                    </span>
                </div>
                {singleForm(index)}
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

    childUID(id, index) {
        return `${this.props.uid}.${index}.${id}`
    }

    addInput(event) {
        this.setState(state => {
            ++state.inputCount
            return state
        })
    }
}
