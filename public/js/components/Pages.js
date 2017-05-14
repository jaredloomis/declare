import React, {Component} from "react"

export default class Pages extends Component {
    constructor(props) {
        super(props)

        this.renderPageItem = this.renderPageItem.bind(this)
    }

    render() {
        return <div>
            {Object.keys(this.props.pages).map(this.renderPageItem)}
            <button onClick={this.createPage} className="btn">
                Create Page
            </button>
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

    createPage() {
    
    }
}
