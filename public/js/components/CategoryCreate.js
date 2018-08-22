import React, {Component} from "react"

import Button    from "./base/Button"
import TextInput from "./base/TextInput"

import bulma from "../../style/bulma.js"

export default class CategoryCreate extends Component {
    constructor(props) {
        super(props)

        this.nameChange = this.nameChange.bind(this)
        this.createPage = this.createPage.bind(this)

        this.state = {
            categoryName: ""
        }
    }

    render() {
        return <div className={`${bulma.field} ${bulma.has_addons}`}>
            <div className={bulma.control}>
                <TextInput onChange={this.nameChange} label="Category Name"/>
            </div>
            <div className={bulma.control}>
                <Button onClick={this.createPage} inline type="info">
                    Create Category
                </Button>
            </div>
        </div>
    }

    createPage() {
        this.props.onCreate(this.state.categoryName)
    }
    
    nameChange(categoryName) {
        this.setState({categoryName})
    }
}
