import React, {Component} from "react"

import Button    from "./base/Button"
import TextInput from "./base/TextInput"

import bulma from "../../style/bulma.js"

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
        return <div className={`${bulma.field} ${bulma.has_addons}`}>
            <div className={bulma.control}>
                <TextInput onChange={this.nameChange} label="Page Name"/>
            </div>
            <div className={bulma.control}>
                <Button onClick={this.createPage} inline={true} type="info">
                    Create Page
                </Button>
            </div>
        </div>
    }

    createPage() {
        this.props.onCreatePage(this.state.pageName)
    }
    
    nameChange(event) {
        this.setState({pageName: event.target.value})
    }
}
