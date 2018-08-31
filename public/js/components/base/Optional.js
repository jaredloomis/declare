import React from "react"

import Row      from "./Row"
import Column   from "./Column"
import Checkbox from "./Checkbox"

const Optional = props => {
    const {
        text, children, isActive,
        onActiveChange
    } = props

    return <div>
        <Row>
            <Column>
                <Checkbox checked={isActive} onChange={onActiveChange}/>
                {text}
            </Column>
            {isActive ? <Column size="8">{children}</Column> : null}
        </Row>
    </div>
}

Optional.displayName = "Optional"
export default Optional
