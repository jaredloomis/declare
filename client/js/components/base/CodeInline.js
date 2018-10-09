import React from "react"

import style from "../../../style/CodeInline.scss"

const CodeInline = ({children}) =>
    <span className={style.code}>{children}</span>

CodeInline.displayName = "CodeInline"
export default CodeInline
