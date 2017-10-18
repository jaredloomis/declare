import React, {Component} from "react"
import {connect}          from "react-redux"
import {compose, withState, setDisplayName} from "recompose"

import Title                   from "../components/base/Title"
import Row                     from "../components/base/Row"
import Column                  from "../components/base/Column"
import FeatherIcon             from "../components/base/FeatherIcon"
import ReportScreenshot        from "../components/ReportScreenshot"
import ReportDestructive       from "../components/ReportDestructive"
import {setBaselineScreenshot, fetchReport} from "../actions/Page"
import {internalIDs} from "../../../app/config/TestPack"
import {deepSet, deepGet} from "../lib/Deep"

import style from "../../style/Report.scss"
import bulma from "../../style/bulma"

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        ...state.reports[ownProps.reportID],
        testPacks: state.testPacks
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchReport() {
            dispatch(fetchReport(ownProps.reportID))
        },
        setBaselineScreenshot(image) {
            dispatch(
                setBaselineScreenshot(ownProps.pageID, ownProps.packID, image)
            )
        }
    }
}

class Report extends Component {
    constructor(props) {
        super(props)

        this.stepExpand = this.stepExpand.bind(this)
    }

    componentDidMount() {
        if(!this.props.name)
            this.props.fetchReport()
    }

    render() {
        const {name, steps} = this.props
        return <div className={`${bulma.box} ${bulma.is_info}`}>
            <Title>{name}</Title>
            <div className={style.reportMain}>
                {renderReportMain(this.props)}
            </div>
            <ul className={style.reportSteps}>
                {(steps || []).map((step, stepI) =>
                    <Step {...step} stepPath={[stepI]}
                        expandedSteps={this.props.expandedSteps}
                        onExpand={this.stepExpand} key={stepI}/>
                )}
            </ul>
        </div>
    }

    stepExpand(stepPath) {
        const currentlyExpanded = deepGet(stepPath, this.props.expandedSteps)
        this.props.setExpandedSteps(
            deepSet(stepPath, !currentlyExpanded, this.props.expandedSteps)
        )
    }
}

const renderReportMain = props => {
    const {internalID} = props.testPacks[props.packID]
    if(internalID === internalIDs.screenshot)
        return <ReportScreenshot {...props}/>
    else if(internalID === internalIDs.destructive)
        return <ReportDestructive {...props}/>
    else
        throw new Error("Unknown report")
}

const Step = ({status, time, message, data, stepPath, children, expandedSteps, onExpand}) => {
    // Values computed from props
    const hasChildren = children && children.length
    const isExpanded  = deepGet(stepPath, expandedSteps)

    // Event handling
    const expand = () => {
        if(hasChildren) {
            onExpand(stepPath)
        }
    }

    const childElements = !isExpanded || !hasChildren ? null : children.map((child, j) => {
        const path = stepPath.concat([j])
        return <Step {...child} onExpand={onExpand} stepPath={path} key={path}/>
    })
    const rawChildList = <ul className={`${style.reportSteps} ${bulma.column}`}>
        {childElements}
    </ul>
    const childList = hasChildren ? rawChildList : null
    const timeStr  = new Date(time).toLocaleString()

    const iconStr = isExpanded ? "chevron-down" : "chevron-right"

        /*
    return <li className={`${style.reportStep} ${style[`status${status}`]}`} key={stepPath}>
        <div className={`${bulma.columns} ${bulma.is_marginless}`} onClick={expand}>
            <span className={`${bulma.column} ${bulma.is_2}`}>
                {hasChildren ? <FeatherIcon icon={iconStr}/> : null}
            </span>
            <span className={`${bulma.column} ${bulma.is_2}`}>{status}</span>
            <span className={bulma.column}>{timeStr}</span>
            <span className={bulma.column}>{message}</span>
        </div>
        {childList}
    </li>*/

    return <li className={`${style.reportStep} ${style[`status${status}`]}`} key={stepPath}>
        <Row marginless onClick={expand}>
            <Column size="2">
                {hasChildren ? <FeatherIcon icon={iconStr}/> : null}
            </Column>
            <Column size="2">
                {status}
            </Column>
            <Column>
                {timeStr}
            </Column>
            <Column>
                {message}
            </Column>
        </Row>
        {childList}
    </li>
}

const enhance = compose(
    // Step paths that are currently expanded.
    // ie.
    // > {"1": true, "5": {"4": true}}
    withState("expandedSteps", "setExpandedSteps", {}),
    connect(mapStateToProps, mapDispatchToProps),
    setDisplayName("Report")
)

export default enhance(Report)
