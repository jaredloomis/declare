import React from "react"

import bulma from "../../../style/bulma.js"
import style from "../../../style/SplitRow.scss"

const SplitRow = ({children}) => {
    const left  = []
    const right = []
    for(let i = 0; i < children.length; ++i) {
        if(i < children.length/2)
            left.push(children[i])
        else
            right.push(children[i])
    }
    return <div className={bulma.level}>
        <div className={bulma.level_left}>
            {left}
        </div>
        <div className={bulma.level_right}>
            {right.map(rt =>
                <div className={bulma.level_item}>
                    {rt}
                </div>
            )}
        </div>
    </div>
}

SplitRow.displayName = "SplitRow"
export default SplitRow
