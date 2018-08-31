import React from "react"

import Heading         from "./Heading"
import EditableHeading from "./EditableHeading"

import style from "../../../style/Title.scss"

const Title = props => {
    const {
        leftLabel, editable
    } = props

    return <div className={style.wrapper}>
        <div className={style.leftLabel}>
            {typeof(leftLabel) === "string" ?
                <span>{leftLabel}</span>    :
                leftLabel
            }
        </div>
        {editable ? <EditableHeading size="2" {...props}/> :
                    <Heading         size="2" {...props}/>
        }
    </div>
}

Title.displayName = "Title"
export default Title
