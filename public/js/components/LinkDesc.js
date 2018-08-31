import React, {Component} from "react"

import Heading        from "./base/Heading"
import ActionDescList from "./ActionDescList"
import withReduxState from "../containers/WithReduxState"

import bulma from "../../style/bulma"
import style from "../../style/Link.scss"

class LinkDesc extends Component {
    constructor(props) {
        super(props)
        this.renderActionList = this.renderActionList.bind(this)
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
                <div className={`${bulma.column} ${bulma.is_primary}`}>
                    {this.renderActionList()}
                </div>
            </div>
        </div>
    }

    renderActionList() {
        return <ActionDescList actions={this.props.defaultValue.navigation}
            productID={this.props.productID}/>
    }
}

const enhance = withReduxState(["pages"])

export default enhance(LinkDesc)
