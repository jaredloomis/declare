import React from "react"

import TextInput from "./base/TextInput"

const PageInfo = ({page={}, onChange}) => {
    const change = fieldName => value => {
        onChange({
            [fieldName]: value
        })
    }

    return <div>
        <TextInput label="Start URL" defaultValue={page.startURL} onChange={change("startURL")}/>
    </div>
}

PageInfo.displayName = "PageInfo"
export default PageInfo
