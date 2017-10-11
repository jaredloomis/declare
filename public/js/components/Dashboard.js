import React from "react"

import Row    from "./base/Row"
import Column from "./base/Column"
import Card   from "./base/Card"

import bulma from "../../style/bulma"

const Dashboard = props => {
    return <Row>
        <Column size="one_third">
            <Card>
                <a href="#/Pages">Pages</a>
            </Card>
        </Column>
    </Row>
}

Dashboard.displayName = "Dashboard"
export default Dashboard
