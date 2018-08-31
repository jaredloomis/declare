import React from "react"

import bulma from "../../../style/bulma"

const Code = ({children, language}) =>
    <pre>
        <code className={`${language ? bulma[`language_${language}`] : ""}`}>
            {children}
        </code>
    </pre>

Code.displayName = "Code"
export default Code
