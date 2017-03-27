import React from "react"

import FieldMany from "./FieldMany"
import FieldText from "./FieldText"

const Field = ({uid, type, options, onChange}) => {
    options = options || {}
    if(typeof(type) === "object") {
        return <FieldMany {...options}
                          uid={uid}
                          fields={type}
                          onChange={onChange}/>
    } else {
        if(type !== "text") {
            console.warn("Field type not recognized in " +
                         `${options.name}: "${type}". ` +
                         "Rendering as FieldText."
            )
        }
        return <FieldText {...options} uid={uid} onChange={onChange}/>
    }
}

Field.displayName = "Field"
export default Field
