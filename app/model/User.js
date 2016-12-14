const Promise  = require("bluebird")
const bcrypt   = Promise.promisifyAll(require("bcrypt"))
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    // This will be the password hash when stored in db
    password: {
        type: String,
        required: true
    },
    passwordSalt: {
        type: String
    }
})

userSchema.methods.checkPassword = async function(password) {
    const hash = await bcrypt.hashAsync(password, this.passwordSalt)
    return hash === this.passwordHash
}

// Before saving to db, hash password
userSchema.pre("save", function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) {
                return next(err)
            }
            this.password     = hash
            this.passwordSalt = salt
            this.save()
            next()
        })
    })
})

const User = mongoose.model("User", userSchema)

module.exports = User
