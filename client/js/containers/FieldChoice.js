// @flow
import React from "react"
import {connect} from "react-redux"

import Select from "../components/base/Select"

const mapStateToProps = (state, ownProps) => {
    const overrides = {}
    // Convert choices to [{value: "", name: ""}]
    // (state selection)
    if(typeof ownProps.choices === "string") {
        overrides.choices = Object.keys(state[ownProps.choices] || {})
            .map(id => ({
                value: id,
                name: state[ownProps.choices][id].name
            }))
    }

    return {
        ...ownProps,
        ...overrides
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

const FieldChoice = ({name, choices, uid, defaultValue, onChange}: any) => {
    return <Select label={name} onChange={onChange(uid)}
                   defaultValue={defaultValue}>
        {renderChoices(choices)}
    </Select>
}

const renderChoices = choices => {
    return choices && choices.map((ch, i) =>
        <span value={ch.value} key={i}>{ch.name}</span>
    )
}

FieldChoice.displayName = "FieldChoice"

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldChoice)
