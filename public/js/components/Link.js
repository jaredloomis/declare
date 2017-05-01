import React, {Component} from "react"
import Select from "./Select"

export default class Link extends Component {
    constructor(props) {
        super(props)
        this.renderAction = this.renderAction.bind(this)
        this.addAction    = this.addAction.bind(this)
        this.removeAction = this.removeAction.bind(this)
        this.changeDest   = this.changeDest.bind(this)
    }

    render() {
        const dest     = this.props.pages[this.props.defaultValue.destination]
        const destName = dest ? dest.name : ""
        return <div className="page-link card">
            <div className="card-content">
            <span className="card-title left">
                {destName}
            </span>
            <button onClick={this.props.onRemove}
                    className="btn btn-floating red right">
                delete
            </button>
            <Select label="Destination" onChange={this.changeDest}>
                {Object.keys(this.props.pages).map(pageID =>
                    <span value={pageID} key={pageID}>
                        {this.props.pages[pageID].name}
                    </span>
                )}
            </Select>
            <div>
                {this.props.defaultValue.navigation.map(
                    this.renderAction
                )}
            </div>
            <button onClick={this.addAction} className="btn">+</button>
            </div>
        </div>
    }

    renderAction(action, index) {
        const randID = Math.random()
        const val    = action ? action.values.element : ""
        const change = event => {
            this.props.onActionChange(index, {
                actionType: "click",
                values: {element: event.target.value}
            })
        }
        return <div key={randID}>
            <Select label="Action" onChange={() => {}}>
                <span value="click">Click</span>
            </Select>
            <div className="input-field">
                <input type="text" defaultValue={val} onChange={change}
                       id={randID}/>
                <label htmlFor={randID}>Element</label>
            </div>
            <button onClick={this.removeAction(index)}
                    className="btn btn-floating red">
                <i className="material-icons">delete</i>
            </button>
        </div>
    }

    addAction() {
        this.props.onActionAdd()
    }

    removeAction(index) {
        return () => {
            this.props.onActionRemove(index)
        }
    }

    changeDest(dest) {
        this.props.onDestChange(dest)
    }
}
