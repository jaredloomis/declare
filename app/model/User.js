const Waterline = require("waterline");

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
    }
});

module.exports = User;
