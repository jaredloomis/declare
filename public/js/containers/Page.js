import React, {Component} from "react"
import {connect} from "react-redux"
import {
    updatePackValue, fetchPage,
    savePackData, updateLinkAction,
    saveLinks, updateLinkDest
} from "../actions/Page"
import PageComponent from "../components/Page"
//import keyCollection from "../lib/KeyCollection"

const mapStateToProps = (state, ownProps) => {
    const props = (state.pages && state.pages[ownProps.pageID]) || {}
    if(props.testPackData) {
        props.testPacks = props.testPackData
        .map(dat => state.testPacks[dat.testPack])
        .filter(pack => pack)
    }
    props.pages = state.pages || []
    return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTestPackChange: uid => event => {
            dispatch(updatePackValue(uid, event.target.value))
        },
        onLinkActionChange(linkI, actionI, action) {
            dispatch(
                updateLinkAction(ownProps.pageID, linkI, actionI, action)
            )
        },
        onLinkDestChange(linkI, dest) {
            dispatch(updateLinkDest(ownProps.pageID, linkI, dest))
        },
        onLinksSave() {
            dispatch(saveLinks(ownProps.pageID))
        },
        onPacksSave() {
            dispatch(savePackData(ownProps.pageID))
        },
        fetchPage() {
            dispatch(fetchPage(ownProps.pageID))
        }
    }
}

class Page extends Component {
    constructor(props) {
        super(props)
        this.props.fetchPage()
    }

    render() {
        if(this.props.name)
            return <PageComponent
                        {...this.props}
                        testPackData={this.props.testPackData}/>
        else
            return <p>Loading...</p>
    }

    keyedTestPackData() {
        const ret = {}
        for(let i = 0; i < this.props.testPackData.length; ++i) {
            const dat = this.props.testPackData[i]
            ret[dat.id] = dat
        }
        return ret
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)
