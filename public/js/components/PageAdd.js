import React, {Component} from "react"

export default class PageAdd extends Component {
    constructor(props) {
        super(props)

        this.nameChange = this.nameChange.bind(this)
        this.createPage = this.createPage.bind(this)

        this.state = {
            pageName: ""
        }
    }

    render() {
        const randID = Math.random()
        return <div>
            <div className="field input-field">
                <input type="text" id={randID} onChange={this.nameChange}/>
                <label htmlFor={randID}>{name}</label>
            </div>
            <button onClick={this.createPage} className="btn">
                Create Page
            </button>
        </div>
    }

    createPage() {
        this.props.onCreatePage(this.state.pageName)
    }
    
    nameChange(event) {
        this.setState({pageName: event.target.value})
    }
}
