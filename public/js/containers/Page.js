import React, {Component} from "react"
import {connect} from "react-redux"
import {
    updatePackValue, fetchPage,
    savePackData, updateLinkAction,
    saveLinks, updateLinkDest, addPack,
    removePack, removeLinkAction, addLinkAction,
    removeLink, removePackMany, addLink,
    removePage, executePack, updatePageInfo,
    savePageInfo, insertLinkAction
} from "../actions/Page"
import {
    createCustomTest, saveCustomTest
} from "../actions/CustomTest"
import Container               from "../components/base/Container"
import Section                 from "../components/base/Section"
import Modal                from "../components/base/Modal"
import Sep         from "../components/base/Sep"
import AddonsField from "../components/base/AddonsField"
import Heading       from "../components/base/Heading"
import Button      from "../components/base/Button"
import Group       from "../components/base/Group"
import PageInfo    from "../components/PageInfo"
import PageComponent from "../components/Page"
import TestPack    from "./TestPack"
import CustomTest  from "./CustomTest"
import LinkDesc    from "../components/LinkDesc"
import Link from "./Link"
import TestPackSelect from "./TestPackSelect"

import bulma from "../../style/bulma.js"
import style from "../../style/Page.scss"

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
        onTestPackChange: uid => value => {
            dispatch(updatePackValue(uid, value))
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
        onLinkActionInsert(linkI, actionI, action) {
            dispatch(insertLinkAction(ownProps.pageID, linkI, actionI, action))
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
            dispatch(fetchPage(ownProps.pageID, false, false, {
                fetchCustomTests: true,
                fetchLinks: true
            }))
        },
        onPackAdd(packID) {
            dispatch(addPack(ownProps.pageID, packID))
        },
        onPackRemove(packID) {
            dispatch(removePack(ownProps.pageID, packID))
        },
        onPackExecute(packID) {
            dispatch(executePack(ownProps.pageID, packID))
        },
        onInfoChange(valMap) {
            dispatch(updatePageInfo(ownProps.pageID, valMap))
            dispatch(savePageInfo(ownProps.pageID))
        },
        onCustomTestAdd() {
            return dispatch(createCustomTest(ownProps.pageID, {name: "x"}))
        },
        onCustomTestSave(testID) {
            dispatch(saveCustomTest(testID))
        }
    }
}

class Page extends Component {
    constructor(props) {
        super(props)
        this.fieldChange = this.fieldChange.bind(this)
        this.linkActionChange = this.linkActionChange.bind(this)
        this.linkActionAdd = this.linkActionAdd.bind(this)
        this.linkAdd = this.linkAdd.bind(this)
        this.addPack = this.addPack.bind(this)
        this.manyRemove = this.manyRemove.bind(this)
        this.addPackChange = this.addPackChange.bind(this)
        this.infoChange = this.infoChange.bind(this)
        this.customTestAdd = this.customTestAdd.bind(this)
        this.customTestsSave = this.customTestsSave.bind(this)
        this.setModal = this.setModal.bind(this)
        this.renderModal = this.renderModal.bind(this)

        this.state = {
            modal: null
        }
    }

    componentDidMount() {
        if(!this.props.startURL) {
            this.props.fetchPage()
        }
    }

    render() {
        const addLink = () => {
            this.props.onLinkAdd()
            this.setModal({
                type: "linkview",
                linkI: this.props.links.length
            })
        }
        const addTest = () => {
            this.props.onCustomTestAdd().then(test =>
                this.setModal({
                    type: "testview",
                    testID: test._id
                })
            )
        }

        return <Section><Container>
            <PageComponent {...this.props}
                onInfoChange={this.infoChange}
                onViewLink={linkI  => this.setModal({type: "linkview", linkI})}
                onViewTest={testID => this.setModal({type: "testview", testID})}
                onAddLink={addLink}
                onAddTest={addTest}/>
            {this.renderModal()}
        </Container></Section>
    }

    renderModal() {
        const modal  = this.state.modal || {}
        const active = modal && modal.type

        const closeModal = () => this.setModal(null)
        const modalOf = (closeAction, children) => {
            const close = () => {
                closeModal()
                closeAction && closeAction()
            }

            return <Modal wide active={active} onClose={close} key={`${modal.type}-modal`}>
                {children}
            </Modal>
        }

        if(!active) {
            return modalOf(null, null)
        } else if(modal.type === "linkedit") {
            const {linkI} = modal
            const link    = this.props.links[linkI]
            return modalOf(this.props.onLinksSave, <Link pages={this.props.pages} defaultValue={link}
                productID={this.props.product}
                onActionChange={this.linkActionChange(linkI)}
                onDestChange={this.linkDestChange(linkI)}
                onActionRemove={this.linkActionRemove(linkI)}
                onActionAdd={this.linkActionAdd(linkI)}
                onActionInsert={this.linkActionInsert(linkI)}
                onRemove={this.linkRemove(linkI)}/>)
        } else if(modal.type === "linkview") {
            const {linkI} = modal
            const link    = this.props.links[linkI]
            return modalOf(this.props.onLinksSave, <LinkDesc defaultValue={link}
                productID={this.props.product}
                onActionChange={this.linkActionChange(linkI)}
                onDestChange={this.linkDestChange(linkI)}
                onActionRemove={this.linkActionRemove(linkI)}
                onActionAdd={this.linkActionAdd(linkI)}
                onActionInsert={this.linkActionInsert(linkI)}
                onRemove={this.linkRemove(linkI)}/>)
        } else if(modal.type === "testview") {
            const {testID} = modal
            return modalOf(() => this.props.onCustomTestSave(testID),
                <CustomTest customTestID={testID} productID={this.props.product}/>
            )
        } else {
            return modalOf(null, null)
        }
    }

    setModal(modal) {
        this.setState({modal})
    }

    renderRow(row, rowI, colWidth) {
        const columns = row.map((tp, colI) => {
            if(tp && tp.testPack) {
                return <div key={colI} className={bulma.column}>
                    <TestPack packID={tp.testPack}
                              pageID={this.props.pageID}
                              onChange={this.fieldChange}
                              onRemove={this.packRemove(tp.testPack)}
                              onManyRemove={this.manyRemove}
                              onExecute={this.packExecute(tp.testPack)}/>
                </div>
            } else {
                return <span key={colI}>Loading...</span>
            }
        })
        return <div className={bulma.columns} key={rowI}>{columns}</div>
    }

    renderCustomTests() {
        if(this.props.customTests) {
            return this.props.customTests
                .map(customTest => {
                const id = customTest && (customTest._id || customTest)
                return <div className={bulma.box} key={id}>
                    <CustomTest customTestID={id} productID={this.props.product}/>
                </div>
            })
        } else {
            return <span>No Custom Tests...</span>
        }
    }

    renderLinks() {
        if(this.props.links) {
            const pages = this.props.pages
            const links = this.props.links.map((link, linkI) =>
                <Link pages={pages} defaultValue={link} key={linkI}
                      productID={this.props.product}
                      onActionChange={this.linkActionChange(linkI)}
                      onDestChange={this.linkDestChange(linkI)}
                      onActionRemove={this.linkActionRemove(linkI)}
                      onActionAdd={this.linkActionAdd(linkI)}
                      onActionInsert={this.linkActionInsert(linkI)}
                      onRemove={this.linkRemove(linkI)}/>
            )
            return <div>
                {links}
            </div>
        } else {
            return <span>Loading...</span>
        }
    }

    infoChange(valMap) {
        this.props.onInfoChange(valMap)
    }

    packExecute(packID) {
        return () => this.props.onPackExecute(packID)
    }

    packRemove(packID) {
        return () => this.props.onPackRemove(packID)
    }

    linkAdd() {
        return this.props.onLinkAdd()
    }

    linkRemove(linkI) {
        return () => this.props.onLinkRemove(linkI)
    }

    linkDestChange(linkI) {
        return value => this.props.onLinkDestChange(linkI, value)
    }

    linkActionChange(linkI) {
        return (actionI, action) =>
            this.props.onLinkActionChange(linkI, actionI, action)
    }

    linkActionAdd(linkI) {
        return () => this.props.onLinkActionAdd(linkI)
    }

    linkActionInsert(linkI) {
        return actionI => this.props.onLinkActionInsert(linkI, actionI)
    }

    linkActionRemove(linkI) {
        return actionI => this.props.onLinkActionRemove(linkI, actionI)
    }

    fieldChange(id) {
        return this.props.onTestPackChange(`${this.props.pageID}.${id}`)
    }

    manyRemove(index) {
        return this.props.onPackManyRemove(index)
    }

    addPack(event) {
        this.props.onPackAdd(this.state.addPackSelection)
    }

    addPackChange(selection) {
        this.setState({addPackSelection: selection})
    }

    customTestAdd() {
        this.props.onCustomTestAdd()
    }

    customTestsSave() {
        this.props.customTests
            .forEach(this.props.onCustomTestSave)
    }
}

function chunk(xs, chunkSize, func) {
    if(!xs) return []
    const ret = [], len = xs.length
    for(let i = 0; i < len; i += chunkSize)
        ret.push(func(xs.slice(i, i + chunkSize), i))
    return ret
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)
