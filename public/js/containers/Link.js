import {lifecycle, compose, setDisplayName} from "recompose"

import {listPages}       from "../actions/Page"

import LinkComponent     from "../components/Link"
import withReduxState    from "./WithReduxState"
import withReduxDispatch from "./WithReduxDispatch"

const enhance = compose(
    withReduxDispatch({
        listPages
    }),
    withReduxState(["pages"]),
    lifecycle({
        componentDidMount() {
            this.props.listPages()
        }
    })
)

export default enhance(LinkComponent)
