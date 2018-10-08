import React from "react"

import bulma from "../../../style/bulma"

const Message = ({type, header, children}) =>
    <article className={`${bulma.message} ${type ? bulma["is-" + type] : ""}`}>
        <div className={bulma.message_header}>
            <p>{header}</p>
            {/*<button className={bulma.delete} aria-label="delete"></button>*/}
        </div>
        <div className={bulma.message_body}>
            {children}
       </div>
    </article>

Message.displayName = "Message"
export default Message
