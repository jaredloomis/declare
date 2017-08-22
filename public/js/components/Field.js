import React from "react"

import FieldMany     from "./FieldMany"
import FieldText     from "./FieldText"
import FieldChoice   from "../containers/FieldChoice"
import FieldElement  from "./FieldElement"

const Field = ({uid, type, options, defaultValue,
                onChange, onManyRemove}) => {
                    console.log(uid)
    options = options || {}
    if(typeof(type) === "object") {
        const indirectType = type[0]
        if(indirectType) {
            type = indirectType
        }

        return <FieldMany {...options}
                          uid={uid}
                          fields={type}
                          defaultValue={defaultValue}
                          onChange={onChange}
                          onInputRemove={onManyRemove}/>
    } else if(type === "select" || type === "dropdown") {
        return <FieldChoice {...options} uid={uid}
                            onChange={onChange}
                            defaultValue={defaultValue}/>
    } else if(type === "element" || type === "selector") {
        return <FieldElement {...options} defaultValue={defaultValue}
                              uid={uid} onChange={onChange}/>
    } else {
        if(type !== "text") {
            console.warn("Field type not recognized in " +
                         `${options.name}: "${type}". ` +
                         "Rendering as FieldText."
            )
        }
        return <FieldText {...options} defaultValue={defaultValue}
                          uid={uid} onChange={onChange}/>
    }
}

Field.displayName = "Field"
export default Field
