import React from "react"

import Box from "./Box"
import bulma from "../../../style/bulma.scss"

const Modal = ({children, active, type, onClose}) =>
    <div className={`${bulma.modal} ${active ? bulma.is_active : ""}`}>
        <div className={bulma.modal_background}>
            Modal Background
        </div>
        <div className={bulma.modal_content}>
            <Box>
                {children}
            </Box>
        </div>
        <button onClick={onClose} className={`${bulma.modal_close} ${bulma.is_large}`} aria-label="close">
        </button>
    </div>

Modal.displayName = "Modal"
export default Modal
