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
            return <Field uid={uid}
                          type={field.type}
                          options={field.options}
                          defaultValue={defVal}
                          onChange={this.props.onChange}
                          onManyRemove={this.props.onInputRemove}
                          key={id}/>
        })

        const forms = [...Array(this.state.inputCount).keys()]
        .map(index => {
            const uid = Math.random() //this.props.fields[]
            return <div className="field-many-form" key={uid}>
                <div className="field-many-singular-name">
                    <span>
                        {this.props.singularName ||
                         this.props.name.slice(0, this.props.name.length-1)}
                        &nbsp;
                        #{index+1}
                        <i onClick={this.removeInput(index)}
                           className="material-icons">delete</i>
                    </span>
                </div>
                {singleForm(index)}
            </div>
        })

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

    removeInput(index) {
        return () => {
            this.setState(state => {
                --state.inputCount
                return state
            })
            console.log(`REMOVE ${this.props.uid}.${index}`)
            this.props.onInputRemove(`${this.props.uid}.${index}`)
        }
    }

    generateKey(index) {
        return Math.random()
    }
}
