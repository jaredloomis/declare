import React from "react"

import FeatherIcon from "./FeatherIcon"

import bulma from "../../../style/bulma"

const CardHeader = ({children}) => {
    return <header class={bulma.card_header}>
        <p class={bulma.card_header_title}>
            Component
        </p>
        <a href="#" class={bulma.card_header_icon} aria-label="more options">
            <span className={bulma.icon}><FeatherIcon icon="arrow-right"/></span>
        </a>
    </header>
}

CardHeader.displayName = "CardHeader"
export default CardHeader
