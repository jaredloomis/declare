import React     from "react"
import {
    compose, setDisplayName
} from "recompose"

import bulma     from "../../../style/bulma.scss"

import withState from "./withState"

const getBlockText = block => {
    if(!block)
        return null
    else if(typeof(block) === "string")
        return block
    else if(block.searchText)
        return block.searchText
    else if(block.props.children && typeof(block.props.children[0]) === "string")
        return block.props.children[0]
    else
        return null
}

/**
 * == Props ==
 * - title        : String
 * - tabs         : [{title: String, blocks: [Block]}]
 * - onBlockClick : (tabI, blockI: Number) => any
 * where
 *  type Block =
 *      ReactElement
 *    | {element: ReactElement, searchText: String, active: Bool}
 */
const Panel = ({title, tabs, onBlockClick, state, setState}) =>
    <div className={bulma.panel}>
        <p className={bulma.panel_heading}>
            {title}
        </p>
        <div className={bulma.panel_block}>
            <p className="control has-icons-left">
                <input onChange={ev => setState({filter: ev.target.value})}
                       className="input is-small" type="text" placeholder="Filter"/>
                <span className="icon is-small is-left">
                    <i className="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
        <p className={bulma.panel_tabs}>
            {tabs.map((tab, tabI) =>
                <a onClick={() => setState({activeTab: tabI})}
                   className={tabI === state.activeTab && bulma.is_active}
                   key={tabI}>
                    {tab.title}
                </a>
            )}
        </p>
        {tabs[state.activeTab].blocks
            .filter(block => {
                const blockText = getBlockText(block)
                return state.filter === "" ||
                    blockText &&
                    blockText.indexOf(state.filter.toLowerCase()) !== -1
            })
            .map((block, blockI) =>
                <a onClick={() => onBlockClick(state.activeTab, blockI)}
                   className={`${bulma.panel_block} ${block.active && bulma.is_active}`}
                   key={block.key || blockI}>
                    {block && block.element || block}
                </a>
            )}
    </div>

const enhance = compose(
    withState("state", "setState", {
        activeTab: 0,
        filter:    ""
    }),
    setDisplayName("Panel")
)

export default enhance(Panel)
