import React, {Component} from "react"
import Select from "./Select"

import "../../style/Link.scss"

export default class Link extends Component {
    constructor(props) {
        super(props)
        this.renderAction = this.renderAction.bind(this)
        this.addAction    = this.addAction.bind(this)
        this.removeAction = this.removeAction.bind(this)
        this.changeDest   = this.changeDest.bind(this)

        const inputKeys = this.props.defaultValue.navigation.map((n, i) =>
            this.generateKey(i)
        )

        this.state = {
            inputKeys
        }
    }

    render() {
        const destID   = this.props.defaultValue.destination
        const dest     = this.props.pages[destID]
        const destName = dest ? dest.name : ""
        return <div className="page-link card">
            <div className="card-content">
            <div className="page-link-header">
                <span className="card-title">
                    {destName}
                </span>
                <button onClick={this.props.onRemove}
                        className="btn btn-floating red right">
                    <i className="material-icons">delete</i>
                </button>
            </div>
            <div className="row">
                <div className="col s2">
                <Select label="Destination" onChange={this.changeDest}
                        defaultValue={destID}>
                    {Object.keys(this.props.pages).map(pageID =>
                        <span value={pageID} key={pageID}>
                            {this.props.pages[pageID].name}
                        </span>
                    )}
                </Select>
                </div>
                <div className="col s10">
                    {this.props.defaultValue.navigation.map(
                        this.renderAction
                    )}
                    <button onClick={this.addAction} className="btn">+</button>
                </div>
            </div>
            </div>
        </div>
    }

    renderAction(action, index) {
        const val    = action && action.values ? action.values.element : ""
        const change = event => {
            this.props.onActionChange(index, {
                actionType: "click",
                values: {element: event.target.value}
            })
        }
        const randID = Math.random()
        const key = this.state.inputKeys[index]
        return <div key={key} className="row">
            <div className="col s2">
            <Select label="Action" onChange={() => {}} defaultValue="click">
                <span value="click">Click</span>
            </Select>
            </div>
            <div className="col s8">
            <div className="input-field">
                <input type="text" defaultValue={val} onChange={change}
                       id={randID}/>
                <label htmlFor={randID}>Element</label>
            </div>
            </div>
            <div className="col s2">
            <button onClick={this.removeAction(index)}
                    className="btn btn-floating red">
                <i className="material-icons">delete</i>
            </button>
            </div>
        </div>
    }

    addAction() {
        this.setState(state => {
            state.inputKeys = [...state.inputKeys, Math.random()]
            return state
        })
        this.props.onActionAdd()
    }

    removeAction(index) {
        return () => {
            this.setState(state => {
                state.inputKeys.splice(index, 1)
                return state
            })
            this.props.onActionRemove(index)
        }
    }

    changeDest(dest) {
        this.props.onDestChange(dest)
    }

    generateKey(index) {
        return Math.random()
    }
}
