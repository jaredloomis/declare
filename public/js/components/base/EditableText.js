import React    from "react"

import Textarea from "./Textarea"
import Editable from "./Editable"

export default Editable(Textarea, ({children}) => <p>{children}</p>)
