// @flow
import React from "react"

import Select from "./Select"

const FieldSelect = ({name, choices, uid, defaultValue}: any) => {
    return <Select label={name}></Select>
}

const renderChoices = choices => {}

FieldSelect.displayName = "FieldSelect"
export default FieldSelect
