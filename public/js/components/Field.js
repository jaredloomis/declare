import React, {Component} from "react"

import FieldMany from "./FieldMany"
import FieldText from "./FieldText"

const Field = ({type, options, onChange}) => {
    if(typeof(type) === "object") {
        return <FieldMany {...options}
                          fields={type}
                          onChange={onChange}/>
    } else {
        return <FieldText {...options} onChange={onChange}/>
    }
}

Field.displayName = "Field"
export default Field
