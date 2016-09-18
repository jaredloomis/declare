const Promise = require("bluebird")
const bcrypt  = Promise.promisifyAll(require("bcrypt"))

module.exports = (schema) => {
    const User = schema.define('User', {
        email: {
            type: schema.String,
            limit: 155,
            unique: true,
            "null": false
        },
        password: {
            type: schema.String,
            "null": false
        },
        passwordHash: {
            type: schema.String,
            "null": false
        },
        passwordSalt: {
            type: schema.String,
            "null": false
        }
    })

    User.afterCreate = function(next) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err) {
                    return next(err)
                }
                this.password     = ""
                this.passwordHash = hash
                this.passwordSalt = salt
                this.save()
                next()
            })
        })
    }

    User.prototype.checkPassword = function(password) {
        return bcrypt.hashAsync(password, this.passwordSalt)
        .then(hash => hash === this.passwordHash)
    }

    return User
}
