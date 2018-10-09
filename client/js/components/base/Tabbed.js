import React from "react"

import {withState, setDisplayName, compose} from "recompose"

import bulma from "../../../style/bulma"
import style from "../../../style/Tabbed.scss"

import Row from "./Row"

const Tabbed = ({tabs, activeTab, setActiveTab}) => {
    const tabLabels = tabs.map((tab, tabI) =>
        <TabLabel active={tabI === activeTab} onClick={() => setActiveTab(tabI)} {...tab} key={tabI}>
            {tab.label}
        </TabLabel>
    )

    return <div>
        <Row>
            <div className={style.tabs}>
                {tabLabels}
            </div>
        </Row>
        {tabs[activeTab].component}
    </div>
}

const TabLabel = ({active, children, ...props}) =>
    <span {...props} className={`${style.tabLabel} ${active ? style.active : ""}`}>
        {children}
    </span>

const enhance = compose(
    withState("activeTab", "setActiveTab", 0),
    setDisplayName("Tabbed")
)

export default enhance(Tabbed)
