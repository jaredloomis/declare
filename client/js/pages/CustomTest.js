import React from "react"
import {lifecycle, compose, setDisplayName} from "recompose"

import {
    fetchPage
} from "../actions/Page"

import {
    fetchCustomTest, saveCustomTest
} from "../actions/CustomTest"

import Container         from "../components/base/Container"
import Section           from "../components/base/Section"
import Breadcrumb        from "../components/base/Breadcrumb"
import Button            from "../components/base/Button"
import withReduxState    from "../containers/WithReduxState"
import withReduxDispatch from "../containers/WithReduxDispatch"
import CustomTestContainer     from "../containers/CustomTest"

const CustomTestBase = props => {
    const test      = props.customTests && props.customTests[props.customTestID]
    const page      = props.pages && test && props.pages[test.owner]
    const productID = page && page.product

    const save = () => props.saveCustomTest(props.customTestID)

    const crumbs = test && page && [
        {text: "Pages", url: "#/Pages"},
        {text: page.name, url: `#/Page/${page._id}`},
        {text: `Test: ${test.name}`}
    ]

    return <Section><Container>
        <Breadcrumb crumbs={crumbs}/>
        <CustomTestContainer productID={productID} {...props}/>
        <Button type="primary" onClick={save}>Save</Button>
    </Container></Section>
}

const enhance = compose(
    withReduxDispatch({
        fetchCustomTest: {
            parameterized: fetchCustomTest
        },
        fetchPage: {
            parameterized: fetchPage
        },
        saveCustomTest: {
            parameterized: saveCustomTest
        }
    }),
    withReduxState(["customTests", "pages"]),
    lifecycle({
        componentDidMount() {
            this.props.fetchCustomTest(this.props.customTestID)
            .then(test =>
                test.owner &&
                this.props.fetchPage(test.owner)
            )
        }
    }),
    setDisplayName("CustomTestPage")
)

export default enhance(CustomTestBase)
