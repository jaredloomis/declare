import React, {Component} from "react"
import {connect} from "react-redux"

import {listPages, createPage} from "../actions/Page"
import PageAdd                 from "../components/PageAdd"
import InputTypes              from "./InputTypes"
import Elements                from "./Elements"

const mapStateToProps = (state, ownProps) => {
    return {
        pages: state.pages
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        listPages() {
            dispatch(listPages)
        },
        createPage(name) {
            dispatch(createPage(name))
        }
    }
}


class Pages extends Component {
    constructor(props) {
        super(props)

        this.renderPageItem = this.renderPageItem.bind(this)
        this.createPage     = this.createPage.bind(this)
    }

    componentDidMount() {
        if(!this.props.pages.length)
            this.props.listPages()
    }

    render() {
        if(this.props.pages)
            return <div>
                <h2>Pages</h2>
                {Object.keys(this.props.pages).map(this.renderPageItem)}
                <h4>Page Add</h4>
                <PageAdd onCreatePage={this.createPage}/>
                <h2>Input Types</h2>
                <InputTypes/>
                <h2>Elements</h2>
                <Elements/>
            </div>
        else
            return <p>Loading...</p>
    }

    renderPageItem(pageID) {
        const page = this.props.pages[pageID]
        const link = `#/Page/${pageID}`
        return <div className="box" key={pageID}>
            <div className="card-content">
                <span className="card-title">
                    <a href={link}>{page.name}</a>
                </span>
            </div>
        </div>
    }

    createPage(name) {
        return this.props.createPage(name)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pages)
