import React, {Component} from "react"

import Button        from "./base/Button"
import FeatherIcon   from "./base/FeatherIcon"
import Heading       from "./base/Heading"
import Flexbox       from "./base/Flexbox"
import Action        from "./Action"
import ActionList    from "./ActionList"
import PageSelect    from "../containers/PageSelect"

import bulma from "../../style/bulma"
import style from "../../style/Link.scss"

export default class Link extends Component {
    constructor(props) {
        super(props)
        this.renderAction = this.renderAction.bind(this)
        this.renderActionList = this.renderActionList.bind(this)
        this.addAction    = this.addAction.bind(this)
        this.removeAction = this.removeAction.bind(this)
        this.changeDest   = this.changeDest.bind(this)

        const inputKeys = this.props.defaultValue && this.props.defaultValue.navigation.map((n, i) =>
            this.generateKey(i)
        )

        this.state = {
            inputKeys
        }
    }

    render() {
        const destID   = this.props.defaultValue.destination
        const dest     = this.props.pages[destID]
        return <div>
            <div className={`${bulma.columns} ${style.linkHeader}`}>
                <div className={`${bulma.column} ${bulma.is_three_quarters}`}>
                    <Flexbox>
                        <Heading>Link To: </Heading>
                        <PageSelect productID={this.props.productID}
                            onChange={this.changeDest} defaultValue={destID}/>
                    </Flexbox>
                </div>
                <div className={bulma.column}>
                    <Button type="danger outlined" onClick={this.props.onRemove}>
                        <FeatherIcon icon="trash-2"/>
                    </Button>
                </div>
            </div>
            {this.renderActionList()}
        </div>
    }

    renderActionList() {
        return <ActionList actions={this.props.defaultValue.navigation}
            productID={this.props.productID}
            onAdd={this.addAction}
            onChange={index => action => this.props.onActionChange(index, action)}
            onRemove={this.removeAction}
            onInsert={this.props.onActionInsert}/>
    }

    renderAction(action, index) {
        const change = newAction => this.props.onActionChange(index, newAction)
        return <Action {...action}
                    onChange={change}
                    onRemove={this.removeAction(index)}
                    key={this.state.inputKeys[index]}/>
    }

    addAction() {
        this.setState(state => {
            state.inputKeys = [...state.inputKeys, Math.random()]
            return state
        })
        this.props.onActionAdd()
    }

    removeAction(index) {
        this.setState(state => {
            state.inputKeys.splice(index, 1)
            return state
        })
        this.props.onActionRemove(index)
    }

    changeDest(dest) {
        this.props.onDestChange(dest)
    }

    generateKey(index) {
        return Math.random()
    }
}
