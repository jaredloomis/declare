import Promise  from "bluebird"
import mongoose from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull,
    GraphQLID, GraphQLString,
    GraphQLInputObjectType
} from "graphql"
const bcrypt = Promise.promisifyAll(require("bcrypt"))
const ObjectId = mongoose.Schema.Types.ObjectId

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
    },
    // Role - User / Admin / SuperAdmin (me)
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    },
    // Account this user belongs to
    owner: {
        type: ObjectId,
        ref: "Account"
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
        },
        owner: {
            type: GraphQLID
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
        },
        owner: {
            type: GraphQLID
        }
    }
})

Object.assign(userSchema.statics, {
    roles: {
        user: "user",
        admin: "admin",
        superAdmin: "superadmin"
    }
})

userSchema.methods.isSuperAdmin = function() {
    return this.role === "superadmin"
}

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
