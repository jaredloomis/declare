import React, {Component} from "react"
import {connect}          from "react-redux"
import {compose, withState, setDisplayName} from "recompose"

import {Status}                from "../constants/Report"
import Heading                 from "../components/base/Heading"
import Row                     from "../components/base/Row"
import Tag                     from "../components/base/Tag"
import Column                  from "../components/base/Column"
import DateString              from "../components/base/DateString"
import FeatherIcon             from "../components/base/FeatherIcon"
import ReportScreenshot        from "../components/ReportScreenshot"
import ReportDestructive       from "../components/ReportDestructive"
import Screenshot              from "./Screenshot"
import {setBaselineScreenshot, fetchReport} from "../actions/Page"
import {fetchAsset}            from "../actions/Asset"
import {config}                from "declare-common"
import {deepSet, deepGet} from "../lib/Deep"
const {internalIDs} = config.TestPack

import style from "../../style/Report.scss"
import bulma from "../../style/bulma"

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        ...state.reports[ownProps.reportID],
        testPacks: state.testPacks,
        assets: state.assets
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchReport() {
            dispatch(fetchReport(ownProps.reportID))
                .then(report => dispatch(fetchAsset(report.summary.video)))
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
        this.props.fetchReport()
    }

    render() {
        const {name, steps} = this.props
        return <div className={`${bulma.box} ${bulma.is_info}`}>
            <Heading>{name}</Heading>
            <div className={style.reportMain}>
                <ReportSummary {...this.props}/>
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

const ReportSummary = props => {
    const internalID = props.testPacks && props.testPacks[props.packID] ?
            props.testPacks[props.packID].internalID :
            null

    const statusDOM = (() => {
        const tagType =
            props.status === Status.PASS ? "success" :
            props.status === Status.FAIL ? "danger"  :
                                           ""
        return <Tag type={`medium ${tagType}`}>{props.status}</Tag>
    })()

    const packDOM = internalID === internalIDs.screenshot  ?
                        <ReportScreenshot {...props}/>     :
                    internalID === internalIDs.destructive ?
                        <ReportDestructive {...props}/> :
                        null

    const videoDOM = (() => {
        if(props.assets && props.summary && props.assets[props.summary.video]) {
            return <video width="320" height="240" controls>
                <source src={props.assets[props.summary.video]} type="video/mp4"/>
            </video>
        } else {
            return null
        }
    })()

        return <div>
            <Row>
                <Column>
                    Status: {statusDOM}<br/>
                    Start Time: <DateString date={props.startTime}/>
                </Column>
                <Column>{videoDOM}</Column>
            </Row>
            {packDOM}
        </div>
}

const Step = props => {
    const {status, time, message, data, stepPath, children, expandedSteps, onExpand} = props
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
            {/*
            <Column>
                {data && data.screenshot && <Screenshot assetKey={data.screenshot}/>}
            </Column>
            */}
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
