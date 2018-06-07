import React from "react"

import style from "../../../style/Flexbox.scss"

const Flexbox = ({children, ...props}) => {
    return <div className={style.container} {...props}>
        {children}
    </div>
}

Flexbox.displayName = "Flexbox"
export default Flexbox
