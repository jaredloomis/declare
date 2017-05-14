import React, {Component} from "react"
import {connect} from "react-redux"
import {listPages} from "../actions/Page"
import Pages from "../components/Pages"

const mapStateToProps = (state, ownProps) => {
    console.log(`Pages mapStateToProps: ${JSON.stringify(state.pages)}`)
    //const pages = Object.assign({}, state.pages)
    return {
        pages: state.pages
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        listPages() {
            dispatch(listPages)
        }
    }
}

class PagesContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.listPages()
    }

    render() {
        if(this.props.pages)
            return <Pages {...this.props}/>
        else
            return <p>Loading...</p>
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PagesContainer)
