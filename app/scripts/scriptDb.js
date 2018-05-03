import mongoose  from "mongoose"
import Promise   from "bluebird"

import {development as dbConfig} from "../../config/database"
import logger                    from "../../common/Logger"

// Use bluebird promises
mongoose.Promise = Promise
global.Promise   = Promise

// Conect to MongoDB server
mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.database}`)

const db = mongoose.connection
// Set up error logging
db.on("error", err => logger.error("Error from DB!", err))
db.once("open", () => {/* we're connected! */})

export default mongoose
