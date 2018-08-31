import React from "react"
import {setDisplayName, compose} from "recompose"

import ActionDesc from "./ActionDesc"

const ActionDescList = ({actions, productID}) => {
    return <div>
        {actions && actions.map((action, actionI) =>
            <ActionDesc {...action}
                productID={productID}
                key={actionI}/>
        )}
    </div>
}

const enhance = compose(
    setDisplayName("ActionDescList")
)

export default enhance(ActionDescList)
