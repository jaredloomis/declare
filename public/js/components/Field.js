import React from "react"

import FieldMany     from "./FieldMany"
import FieldText     from "./FieldText"
import FieldChoice   from "../containers/FieldChoice"
import FieldElement  from "./FieldElement"

const Field = ({uid, type, options, defaultValue,
                onChange, onManyRemove}) => {
    options = options || {}

    if(Array.isArray(type)) {
        return <FieldMany {...options}
                          uid={uid}
                          fields={type[0]}
                          defaultValue={defaultValue}
                          onChange={onChange}
                          onInputRemove={onManyRemove}/>
    } else if(typeof(type) === "object") {
        if(type.type && type.options) {
            return <Field uid={uid}
                          type={type.type}
                          options={type.options}
                          defaultValue={defaultValue}
                          onChange={onChange}
                          onManyRemove={onManyRemove}
                          key={uid}/>
        } else {
            const ret = Object.keys(type).map(key => {
                const field = type[key]
                const keyUid  = `${uid}.${key}`
                return <Field uid={keyUid}
                              type={field.type}
                              options={field.options}
                              defaultValue={defaultValue && defaultValue[key]}
                              onChange={onChange}
                              onManyRemove={onManyRemove}
                              key={keyUid}/>
            })
            return <div>{ret}</div>
        }
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
                         `${uid} (${options.name}): "${JSON.stringify(type)}". ` +
                         "Rendering as FieldText."
            )
        }
        return <FieldText {...options} defaultValue={defaultValue}
                          uid={uid} onChange={onChange}/>
    }
}

Field.displayName = "Field"
export default Field
