import React, {Component} from "react"
import {connect} from "react-redux"

import {listPages, createPage} from "../actions/Page"
import PageAdd                 from "../components/PageAdd"
import InputTypes              from "./InputTypes"

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
                {Object.keys(this.props.pages).map(this.renderPageItem)}
                <PageAdd onCreatePage={this.createPage}/>
                <InputTypes/>
            </div>
        else
            return <p>Loading...</p>
    }

    renderPageItem(pageID) {
        const page = this.props.pages[pageID]
        const link = `#/Page/${pageID}`
        return <div className="card" key={pageID}>
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
