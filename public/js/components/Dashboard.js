import React from "react"

import Row         from "./base/Row"
import Column      from "./base/Column"
import SectionCard from "./SectionCard"

const Dashboard = () =>
    <Row>
        <Column>
            <SectionCard name="Pages" href="#/Pages">
                <span>Your Pages - where the automation magic happens.</span>
            </SectionCard>
        </Column>
        <Column>
            <SectionCard name="Elements" href="#/Elements">
                <span>Your Elements - all the elements you interact with on your site, in one location.</span>
            </SectionCard>
        </Column>
        <Column>
            <SectionCard name="Input Types" href="#/InputTypes">
                <span>Your Input Types - all the types of user inputs you expect to be rejected or accepted.</span>
            </SectionCard>
        </Column>
    </Row>

Dashboard.displayName = "Dashboard"
export default Dashboard
