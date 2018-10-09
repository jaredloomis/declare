import React, {Component} from "react"
import {connect} from "react-redux"
import {lifecycle, compose} from "recompose"

import {listElements}       from "../actions/Element"
import {updatePackValue} from "../actions/Page"
import {fetchPack} from "../actions/TestPack"
import Button from "../components/base/Button"
import Heading  from "../components/base/Heading"
import Field from "../components/Field"
import Report from "./Report"
import {deepGet} from "../lib/Deep"
import withReduxDispatch from "./WithReduxDispatch"

import bulma from "../../style/bulma"
import style from "../../style/TestPack.scss"

const mapStateToProps = (state, ownProps) => {
    // Copy over all TestPack props
    const props = Object.assign({}, state.testPacks[ownProps.packID]) || {}
    // Assign props.{values, reports} based on page.testPackData
    const page = state.pages[ownProps.pageID]
    if(page && page.testPackData) {
        const testPackData = page.testPackData
                         .filter(dat => dat.testPack === ownProps.packID)[0]
        if(testPackData) {
            props.values  = testPackData.values
            props.reports = testPackData.reports
        }
    }
    return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: uid => value => {
            if(value.target) value = value.target.value
            dispatch(updatePackValue(uid, value))
        },
        fetchPack: () => {
            dispatch(fetchPack(ownProps.packID))
        }
    }
}

class TestPack extends Component {
    constructor(props) {
        super(props)
        this.remove        = this.remove.bind(this)
        this.manyRemove    = this.manyRemove.bind(this)
        this.fieldValue    = this.fieldValue.bind(this)
        this.fieldUID      = this.fieldUID.bind(this)
        this.toggleReports = this.toggleReports.bind(this)

        this.state = {
            reportsExpanded: false
        }
    }

    componentDidMount() {
        this.props.fetchPack()
    }

    render() {
        if(!this.props.name) {
            return <p>Loading...</p>
        }

        const fields = this.props.fields || {}
        const form = Object.keys(fields).map(id => {
            const field = this.props.fields[id]
            const uid   = this.fieldUID(id)
            return <Field uid={uid}
                          type={field.type}
                          options={field.options}
                          defaultValue={this.fieldValue(uid)}
                          onChange={this.props.onChange}
                          onManyRemove={this.manyRemove}
                          key={id}/>
        })

        return <div className={`test-pack ${bulma.box}`}>
            <div className={style.testPackHeader}>
                <div className={bulma.is_pulled_left}>
                    <Heading>{this.props.name}</Heading>
                </div>
                <div className={style.testPackControls}>
                    <Button onClick={this.remove} type="danger outlined">
                        <i className="large material-icons">delete</i>
                    </Button>
                    <Button onClick={this.props.onExecute} type="success">
                        <i className="large material-icons">play_arrow</i>
                    </Button>
                </div>
            </div>
            <div className={bulma.is_clearfix}></div>
            <div className="card-content">
                <div className="test-pack-form">
                    {form}
                </div>
                <div className={style.testPackReports}>
                    <Button onClick={this.toggleReports}>
                        {this.state.reportsExpanded ? "Hide" : "Show"} Reports
                    </Button>
                    <div className={style.testPackReportList}>
                        {this.renderReports()}
                    </div>
                </div>
            </div>
        </div>
    }

    renderReports() {
        if(this.state.reportsExpanded) {
            return this.props.reports.slice().reverse().map(reportID =>
                <Report reportID={reportID}
                        pageID={this.props.pageID}
                        packID={this.props.packID}
                        key={reportID}/>
            )
        } else {
            return []
        }
    }

    toggleReports() {
        this.setState(state => ({
            reportsExpanded: !state.reportsExpanded
        }))
    }

    manyRemove(uid) {
        return this.props.onManyRemove(uid)
    }

    remove() {
        return this.props.onRemove()
    }

    fieldValue(uid) {
        const [pageID, packID, ...selector] = uid.split(".")
        return deepGet(selector, this.props.values)
    }

    fieldUID(id) {
        return `${this.props.pageID}.${this.props.packID}.${id}`
    }
}

const sortReports = reports => {
    return reports.sort((a, b) => {
        const timeA = new Date(a.steps[0].time).getTime()
        const timeB = new Date(b.steps[0].time).getTime()
        return timeA < timeB ?  1 :
               timeA > timeB ? -1 :
                                0
    })
}

const enhance = compose(
    withReduxDispatch({
        listElements
    }),
    lifecycle({
        componentDidMount() {
            this.props.listElements()
        }
    }),
    connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(TestPack)
