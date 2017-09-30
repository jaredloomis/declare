import React, {Component} from "react"
import {connect}          from "react-redux"

import Title                   from "../components/base/Title"
import ReportScreenshot        from "../components/ReportScreenshot"
import ReportDestructive       from "../components/ReportDestructive"
import {setBaselineScreenshot, fetchReport} from "../actions/Page"
import {internalIDs} from "../../../app/config/TestPack"

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
                {(steps || []).map(renderStep)}
            </ul>
        </div>
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

const renderStep = ({status, time, message, data, children}, i) => {
    const childElements = children && children.map((child, j) =>
        renderStep(child, i + (j * 0.0001))
    )
    const rawChildList = <ul className={`${style.reportSteps} ${bulma.column}`}>
        {childElements}
    </ul>
    const childList = children.length ? rawChildList : null
    const timeStr  = new Date(time).toLocaleString()

    return <li className={`${style.reportStep} ${style[`status${status}`]}`} key={i}>
        <div className={`${bulma.columns} ${bulma.is_marginless}`}>
            <span className={`${bulma.column} ${bulma.is_2}`}>{status}</span>
            <span className={bulma.column}>{timeStr}</span>
            <span className={bulma.column}>{message}</span>
        </div>
        {childList}
    </li>
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Report)
