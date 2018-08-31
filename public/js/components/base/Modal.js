import React from "react"

import FeatherIcon from "./FeatherIcon"

import bulma from "../../../style/bulma.scss"
import style from "../../../style/Modal.scss"

const Modal = ({children, active, wide, onClose}) =>
    <div className={`${bulma.modal} ${active ? bulma.is_active : ""}
                     ${wide ? style.wideModal : ""}`}>
        <div className={bulma.modal_background} onClick={onClose}>
        </div>
        <div className={`${bulma.modal_content} ${style.content}`}>
            <div className={style.innerContent}>
                {children}
            </div>
        </div>
        <button onClick={onClose} className={`${bulma.modal_close} ${bulma.is_large}`} aria-label="close">
        </button>
    </div>

Modal.displayName = "Modal"
export default Modal
