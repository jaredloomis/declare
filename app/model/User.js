const bcrypt    = require("bcrypt")
const Waterline = require("waterline")

const User = Waterline.Collection.extend({
    identity: "user",
    connection: "myMongo",
    attributes: {
        email: {
            type:     "string",
            email:    true,
            required: true,
            unique:   true
        },
        passwordHash: {
            type:     "string",
            required: true
        },
        passwordSalt: {
            type:     "string",
            required: true
        }
    },

    beforeCreate: function(values, cb) {
        console.log("WASABI");
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(values.password, salt, (err, hash) => {
                if(err) {
                    return cb(err)
                }
                values.passwordHash = hash
                values.passwordSalt = salt
                return cb()
            })
        })
    }
})

module.exports = User
