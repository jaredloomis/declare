import React from "react"
import {
    setDisplayName, compose, withState
} from "recompose"

import Group         from "./base/Group"
import Button        from "./base/Button"
import Sep           from "./base/Sep"
import EditableTitle from "./base/EditableTitle"
import SplitRow      from "./base/SplitRow"
import FeatherIcon   from "./base/FeatherIcon"
import ActionList    from "./ActionList"
import Report        from "../containers/Report"

const CustomTest = props => {
    const {
        name, actions, reports, productID,
        onNameChange,
        onActionChange, onActionRemove, onActionAdd, onActionInsert,
        onRemove, onExecute,
        reportsExpanded, setReportsExpanded
    } = props

    const toggleReports = () => setReportsExpanded(!reportsExpanded)

    const reportsDOM = reportsExpanded && reports &&
                       reversePure(reports).map(reportID =>
        <Report reportID={reportID} key={reportID || "key"}/>
    )

    return <div>
        <SplitRow>
            <EditableTitle size="4" onChange={onNameChange}>{name}</EditableTitle>
            <Group>
                <Button type="danger outlined" onClick={onRemove}>
                    <FeatherIcon icon="trash"/>
                </Button>
                <Button type="success" onClick={onExecute}>
                    <FeatherIcon icon="play"/>
                </Button>
            </Group>
        </SplitRow>
        <ActionList actions={actions}
            productID={productID}
            onAdd={onActionAdd}
            onChange={onActionChange}
            onRemove={onActionRemove}
            onInsert={onActionInsert}/>
        <Sep/>
        <Group>
            <Button onClick={toggleReports}>
                {reportsExpanded ? "Hide" : "Show"} Reports
            </Button>
        </Group>
        {reportsDOM}
    </div>
}

const reversePure = xs => {
    const ret = []
    for(let i = xs.length-1; i >= 0; --i) {
        ret.push(xs[i])
    }
    return ret
}
const enhance = compose(
    withState("reportsExpanded", "setReportsExpanded", false),
    setDisplayName("CustomTest")
)

export default enhance(CustomTest)
