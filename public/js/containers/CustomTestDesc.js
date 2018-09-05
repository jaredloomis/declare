import {compose, setDisplayName, withProps, lifecycle} from "recompose"

import {
    listElements
} from "../actions/Element"
import CustomTestDescComponent from "../components/CustomTestDesc"
import withReduxState          from "./WithReduxState"
import withReduxDispatch       from "./WithReduxDispatch"

const enhance = compose(
    withReduxState(["customTests"]),
    withReduxDispatch({listElements}),
    lifecycle({
        componentDidMount() {
            this.props.listElements()
        }
    }),
    withProps(({customTests, customTestID}) => ({
        ...customTests[customTestID]
    })),
    setDisplayName("CustomTestDescContainer")
)

export default enhance(CustomTestDescComponent)
