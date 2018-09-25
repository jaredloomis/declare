import React from "react"

import Title                    from "../components/base/Title"
import Section                  from "../components/base/Section"
import Container                from "../components/base/Container"
import EnvironmentListContainer from "../containers/EnvironmentList"

const EnvironmentList = () => <Section><Container>
    <Title>Environments</Title>
    <br/>
    <EnvironmentListContainer/>
</Container></Section>

EnvironmentList.displayName = "EnvironmentListPage"
export default EnvironmentList
