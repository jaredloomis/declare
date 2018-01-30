import Promise  from "bluebird"
import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull,
    GraphQLID, GraphQLString,
    GraphQLInputObjectType
} from "graphql"
const bcrypt = Promise.promisifyAll(require("bcrypt"))

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
    // Salt is generated automatically
    passwordSalt: {
        type: String
    }
})

userSchema.statics.graphQL = new GraphQLObjectType({
    name: "User",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        passwordSalt: {
            type: GraphQLString // Prob could be non-null
        }
    }
})

userSchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "UserInput",
    fields: {
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    }
})

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareAsync(password, this.password)
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
            //this.save()
            next()
        })
    })
})

module.exports = mongoose.model("User", userSchema)
