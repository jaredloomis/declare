import React, {Component} from "react"

import Heading         from "./base/Heading"
import ActionDescList    from "./ActionDescList"

import bulma from "../../style/bulma"
import style from "../../style/Link.scss"

export default class LinkDesc extends Component {
    constructor(props) {
        super(props)
        this.renderActionList = this.renderActionList.bind(this)

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
        return <div>
            <div className={`${bulma.columns} ${style.linkHeader}`}>
                <div className={bulma.column}>
                    <Heading>Link To: {destName}</Heading>
                </div>
            </div>
            <div className={bulma.columns}>
                <div className={`${bulma.column} ${bulma.is_one_quarter}`}>
                    <span>Destination: {destID}</span>
                </div>
                <div className={`${bulma.column} ${bulma.is_primary} ${style.linkActions}`}>
                    {this.renderActionList()}
                </div>
            </div>
        </div>
    }

    renderActionList() {
        return <ActionDescList actions={this.props.defaultValue.navigation}
            productID={this.props.productID}/>
    }

    generateKey(index) {
        return Math.random()
    }
}
