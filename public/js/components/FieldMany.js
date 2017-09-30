import React, {Component} from "react"
import Field from "./Field"
import Button from "./base/Button"
import {deepGet} from "../lib/Deep"

import bulma from "../../style/bulma"
import style from "../../style/TestPack.scss"

export default class FieldMany extends Component {
    constructor(props) {
        super(props)

        this.addInput = this.addInput.bind(this)
        this.childUID = this.childUID.bind(this)
        this.fieldValue = this.fieldValue.bind(this)

        const inputCount = this.props.defaultValue ?
            Math.max(1, this.props.defaultValue.length || 1) : 1
        const inputKeys = [...Array(inputCount).keys()].map(() =>
            Math.random()
        )
        this.state = {
            inputCount,
            inputKeys
        }
    }

    render() {
        const singleForm = index => {
            const uid = `${this.props.uid}.${index}`
            return <Field type={this.props.fields}
                          uid={uid}
                          defaultValue={this.fieldValue(uid)}
                          onChange={this.props.onChange}
                          onManyRemove={this.props.onInputRemove}
                          key={uid}/>
        }

        const forms = [...Array(this.state.inputCount).keys()]
        .map(index => {
            const uid = this.state.inputKeys[index]
            return <div className={style.fieldManyForm} key={uid}>
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

        return <div className={style.fieldMany}>
            <div className="field-many-name">
                <label className={bulma.label}>{this.props.name}</label>
            </div>
            <div className={`${style.fieldManyBody}`}>
                {forms}
                <Button onClick={this.addInput} type="info">
                    + Add {this.singularize(this.props.name)}
                </Button>
            </div>
        </div>
    }

    /* XXX: This is a hack. This data should be hardcoded in TestPack db */
    singularize(str) {
        return str[str.length-1] === "s" ?
            str.slice(0, str.length-1) :
            str
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
            state.inputKeys.push(this.generateKey())
            return state
        })
        this.setState(state => {
            ++state.inputCount
            return state
        })
    }

    removeInput(index) {
        return () => {
            this.setState(state => {
                state.inputKeys.splice(index, 1)
                return state
            })
            this.setState(state => {
                --state.inputCount
                return state
            })
            this.props.onInputRemove(`${this.props.uid}.${index}`)
        }
    }

    generateKey(index) {
        return Math.random()
    }
}
