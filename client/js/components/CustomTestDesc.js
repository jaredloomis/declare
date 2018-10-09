import React from "react"
import {
    setDisplayName, compose, withState
} from "recompose"

import Row            from "./base/Row"
import Column         from "./base/Column"
import Heading        from "./base/Heading"
import ActionDescList from "./ActionDescList"

const CustomTestDesc = props => {
    const {
        name, actions, reports, productID
    } = props

    return <div>
        <Row>
            <Column>
                <Heading>{name}</Heading>
            </Column>
        </Row>
        <Row>
            <Column>
                <ActionDescList actions={actions}
                    productID={productID}/>
            </Column>
        </Row>
    </div>
}

const enhance = compose(
    withState("reportsExpanded", "setReportsExpanded", false),
    setDisplayName("CustomTestDesc")
)

export default enhance(CustomTestDesc)
