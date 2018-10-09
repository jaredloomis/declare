import React from "react"

import bulma from "../../../style/bulma"

const Hero = ({children, modifier}) =>
    <section className={`${bulma.hero} ${bulma[`is_${modifier}`] || ""}`}>
        <div className={bulma.hero_body}>
            <div className={bulma.container}>
                {children}
            </div>
        </div>
    </section>

Hero.displayName = "Hero"
export default Hero
