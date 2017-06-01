import React, {Component} from "react"
import {connect} from "react-redux"
import {
    updatePackValue, fetchPage,
    savePackData, updateLinkAction,
    saveLinks, updateLinkDest, addPack,
    removePack, removeLinkAction, addLinkAction,
    removeLink, removePackMany, addLink,
    removePage, executePack
} from "../actions/Page"
import PageComponent from "../components/Page"
//import keyCollection from "../lib/KeyCollection"

const mapStateToProps = (state, ownProps) => {
    const props = state.pages ?
        Object.assign({}, state.pages[ownProps.pageID]) :
        {}
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
        onPageDelete() {
            dispatch(removePage(ownProps.pageID))
        },
        onTestPackChange: uid => event => {
            dispatch(updatePackValue(uid, event.target.value))
        },
        onPackManyRemove(uid) {
            dispatch(removePackMany(uid))
        },
        onLinkAdd() {
            dispatch(addLink(ownProps.pageID))
        },
        onLinkRemove(linkI) {
            dispatch(removeLink(ownProps.pageID, linkI))
        },
        onLinkActionChange(linkI, actionI, action) {
            dispatch(
                updateLinkAction(ownProps.pageID, linkI, actionI, action)
            )
        },
        onLinkActionAdd(linkI) {
            dispatch(addLinkAction(ownProps.pageID, linkI))
        },
        onLinkActionRemove(linkI, actionI) {
            dispatch(removeLinkAction(ownProps.pageID, linkI, actionI))
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
            dispatch(fetchPage(ownProps.pageID, false, true))
        },
        onPackAdd(packID) {
            dispatch(addPack(ownProps.pageID, packID))
        },
        onPackRemove(packID) {
            dispatch(removePack(ownProps.pageID, packID))
        },
        onPackExecute(packID) {
            dispatch(executePack(ownProps.pageID, packID))
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
            return <PageComponent {...this.props}/>
        else
            return <span>Loading...</span>
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
