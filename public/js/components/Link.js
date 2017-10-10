import React, {Component} from "react"

import Button        from "./base/Button"
import Select        from "./base/Select"
import Title         from "./base/Title"
import ElementSelect from "../containers/ElementSelect"

import bulma from "../../style/bulma"
import style from "../../style/Link.scss"

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
        return <div className={bulma.box}>
            <div className={`${bulma.columns} ${style.linkHeader}`}>
                <div className={`${bulma.column} ${bulma.is_three_quarters}`}>
                    <Title>Link To: {destName}</Title>
                </div>
                <div className={bulma.column}>
                    <Button type="danger outlined" onClick={this.props.onRemove}>
                        <i className="material-icons">delete</i>
                    </Button>
                </div>
            </div>
            <div className={bulma.columns}>
                <div className={`${bulma.column} ${bulma.is_one_quarter}`}>
                <Select label="Destination" onChange={this.changeDest}
                        defaultValue={destID}>
                    {Object.keys(this.props.pages).map(pageID =>
                        <span value={pageID} key={pageID}>
                            {this.props.pages[pageID].name}
                        </span>
                    )}
                </Select>
                </div>
                <div className={`${bulma.column} ${bulma.is_primary} ${style.linkActions}`}>
                    {this.props.defaultValue.navigation.map(
                        this.renderAction
                    )}
                    <Button onClick={this.addAction} type="info">+</Button>
                </div>
            </div>
        </div>
    }

    renderAction(action, index) {
        const val    = action && action.values ?
                action.values.element : ""
        const change = value => {
            this.props.onActionChange(index, {
                actionType: "click",
                values: {element: value}
            })
        }
        const key = this.state.inputKeys[index]
        return <div key={key} className={bulma.columns}>
            <div className={`${bulma.column} ${bulma.is_one_quarter}`}>
            <Select label="Action" onChange={() => {}} defaultValue="click">
                <span value="click">Click</span>
            </Select>
            </div>
            <div className={bulma.column}>
            <ElementSelect defaultValue={val} onChange={change}/>
            </div>
            <div className={bulma.column}>
            <Button inline={true} type="danger outlined" onClick={this.removeAction(index)}>
                <i className="material-icons">delete</i>
            </Button>
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
