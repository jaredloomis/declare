import React, {Component} from "react"

import PageAdd from "./PageAdd"

export default class Pages extends Component {
    constructor(props) {
        super(props)

        this.renderPageItem = this.renderPageItem.bind(this)
        this.createPage     = this.createPage.bind(this)
    }

    render() {
        return <div>
            {Object.keys(this.props.pages).map(this.renderPageItem)}
            <PageAdd onCreatePage={this.createPage}/>
        </div>
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
