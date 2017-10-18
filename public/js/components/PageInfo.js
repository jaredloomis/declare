import React from "react"

import TextInput from "./base/TextInput"

//import bulma from "../../style/bulma.scss"

const PageInfo = ({page={}, onChange}) => {
    const change = fieldName => event => {
        onChange({
            [fieldName]: event.target.value
        })
    }

    return <div>
        <TextInput label="Start URL" defaultValue={page.startUrl}
                   onChange={change("startUrl")}/>
    </div>
}

PageInfo.displayName = "PageInfo"
export default PageInfo
