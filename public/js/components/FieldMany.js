import React, {Component} from "react"
import Field from "./Field"
import {deepGet} from "../lib/Deep"

export default class FieldMany extends Component {
    constructor(props) {
        super(props)

        this.addInput = this.addInput.bind(this)
        this.childUID = this.childUID.bind(this)
        this.fieldValue = this.fieldValue.bind(this)

        this.state = {
            inputCount: Math.max(1, this.props.defaultValue.length)
        }
    }

    render() {
        const singleForm = index => Object.keys(this.props.fields)
        .map(id => {
            const field  = this.props.fields[id]
            const uid    = this.childUID(id, index)
            const defVal = this.fieldValue(uid)
            console.log(defVal)
            return <Field uid={uid}
                          type={field.type}
                          options={field.options}
                          defaultValue={defVal}
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

    fieldValue(uid) {
        const depth = this.props.uid.split(".").length
        const shortSelector = uid.split(".").slice(depth, Infinity)
        return deepGet(shortSelector, this.props.defaultValue)
        /*
        console.log(uid)
        const [pageID, packID, self, ...selector] = uid.split(".")
        console.log(`${selector} ${JSON.stringify(this.props.defaultValue)}`)
        return deepGet(selector, this.props.defaultValue)
        */
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
