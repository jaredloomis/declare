import React, {Component} from "react"
import Select from "./Select"

export default class Link extends Component {
    constructor(props) {
        super(props)
        this.addAction    = this.addAction.bind(this)
        this.changeDest   = this.changeDest.bind(this)
        this.renderAction = this.renderAction.bind(this)

        this.state = {
            actionCount: Math.max(
                1, this.props.defaultValue.navigation.length
            )
        }
    }

    addAction(event) {
        this.setState(state => {
            ++state.actionCount
            return state
        })
    }

    changeDest(dest) {
        this.props.onDestChange(dest)
    }

    render() {
        const dest     = this.props.pages[this.props.defaultValue.destination]
        const destName = dest ? dest.name : ""
        return <div className="page-link card">
            <div className="card-content">
            <span className="card-title">
                {destName}
            </span>
            <Select label="Destination" onChange={this.changeDest}>
                {Object.keys(this.props.pages).map(pageID =>
                    <span value={pageID} key={pageID}>
                        {this.props.pages[pageID].name}
                    </span>
                )}
            </Select>
            <div>
                {[...Array(this.state.actionCount).keys()].map(
                    this.renderAction
                )}
            </div>
            <button onClick={this.addAction} className="btn">+</button>
            </div>
        </div>
    }

    renderAction(index) {
        const randID = Math.random()
        const action = this.props.defaultValue.navigation[index]
        const val    = action ? action.values.element : ""
        const change = event => {
            this.props.onActionChange(index, {
                actionType: "click",
                values: {element: event.target.value}
            })
        }
        return <div key={index}>
            <Select label="Action" onChange={() => {}}>
                <span value="click">Click</span>
            </Select>
            <div className="input-field">
                <input type="text" defaultValue={val} onChange={change}
                       id={randID}/>
                <label htmlFor={randID}>Element</label>
            </div>
        </div>
    }
}
