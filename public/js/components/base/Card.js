import React from "react"

import FeatherIcon from "./FeatherIcon"

import bulma from "../../../style/bulma"

const Card = ({children}) => {
    return <div className={bulma.card}>
        <header class={bulma.card_header}>
            <p class={bulma.card_header_title}>
                Component
            </p>
            <a href="#" class={bulma.card_header_icon} aria-label="more options">
                <span className={bulma.icon}><FeatherIcon icon="arrow-right"/></span>
            </a>
        </header>
        <div className={bulma.card_content}>
            <div className={bulma.media}>
                <div className={bulma.media_left}>
                    <figure className={`${bulma.image} ${bulma.is_48x48}`}>
                        <img src="http://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                    </figure>
                </div>
                <div className={bulma.media_content}>
                    <p className={`${bulma.title} ${bulma.is_4}`}>John Smith</p>
                    <p className={`${bulma.subtitle} ${bulma.is_6}`}>@johnsmith</p>
                </div>
            </div>
            <div className={bulma.content}>
                {children}
            </div>
        </div>
    </div>
}

Card.displayName = "Card"
export default Card
