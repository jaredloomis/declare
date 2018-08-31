import React from "react"

import bulma from "../../../style/bulma"

const CodeBlock = ({children, language}) =>
    <pre>
        <code className={`${language ? bulma[`language_${language}`] : ""}`}>
            {children}
        </code>
    </pre>

CodeBlock.displayName = "CodeBlock"
export default CodeBlock
