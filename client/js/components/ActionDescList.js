import React from "react"
import {setDisplayName, compose} from "recompose"

import Row           from "./base/Row"
import Column        from "./base/Column"

import ActionDesc from "./ActionDesc"

const ActionDescList = ({actions, productID}) => {
    return <div>
        {actions && actions.map((action, actionI) =>
            <Row key={actionI}>
                <Column>
                    {actionI + 1}.
                    <ActionDesc {...action}
                        productID={productID}/>
                </Column>
            </Row>
        )}
    </div>
}

const enhance = compose(
    setDisplayName("ActionDescList")
)

export default enhance(ActionDescList)
