import React from "react"

import FeatherIcon from "./base/FeatherIcon"

import bulma from "../../style/bulma"

const SectionCard = ({href, name, children}) =>
    <div className={bulma.card}>
        <header className={bulma.card_header}>
            <p className={bulma.card_header_title}>
                {name}
            </p>
            <a href={href} className={bulma.card_header_icon} aria-label="more options">
                <span className={bulma.icon}><FeatherIcon icon="arrow-right"/></span>
            </a>
        </header>
        <div className={bulma.card_content}>
            <div className={bulma.content}>
                {children}
            </div>
        </div>
    </div>

SectionCard.displayName = "SectionCard"
export default SectionCard
