import Promise    from "bluebird"
import mongoose   from "mongoose"
import {
    GraphQLObjectType, GraphQLNonNull, GraphQLString,
    GraphQLID, GraphQLInputObjectType, GraphQLList
} from "graphql"
import treePlugin from "./plugins/Tree"
const ObjectId = mongoose.Schema.Types.ObjectId

const categorySchema = new mongoose.Schema({
    // Name of the category
    name:    {type: String, required: true},
    // Items contained in the category
    items:  [{type: ObjectId}],
    // The type of ObjectIds stored in items (ex. "Page")
    itemRef: {type: String, required: true},
    // Account that owns this Category
    owner:   {type: ObjectId, ref: "Account",
              required: true}
})
// Apply tree plugin
categorySchema.plugin(treePlugin, {
    pathSeparator:  "#",
    onDelete:       "REPARENT",
    numWorkers:     5, // XXX WHATS A GOOD VAl??
    idType:         ObjectId
})

categorySchema.statics.graphQL = new GraphQLObjectType({
    name: "Category",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        parent: {
            type: GraphQLID
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        items: {
            type: new GraphQLList(GraphQLID)
        },
        itemRef: {
            type: new GraphQLNonNull(GraphQLString)
        },
        children: {
            type: new GraphQLList(GraphQLID)
        },
        owner: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})

categorySchema.statics.graphQLInput = new GraphQLInputObjectType({
    name: "CategoryInput",
    fields: {
        parent: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        items: {
            type: new GraphQLList(GraphQLID)
        },
        itemRef: {
            type: GraphQLString
        },
        owner: {
            type: GraphQLID
        }
    }
})

categorySchema.methods.tree = function() {
    const options = {
        recursive: true,
        lean:      true
    }
    return new Promise((resolve, reject) =>
        this.getChildrenTree(options, (err, children) => {
            if(err) return reject(err)
            const ret = this.toObject()
            ret.children = children
            resolve(ret)
        })
    )
}

categorySchema.virtual("children").get(function() {
    return new Promise((resolve, reject) =>
        this.getChildren({}, {_id: true}, {}, false, (err, children) => {
            if(err) reject(err)
            else resolve(children.map(child => child._id))
        })
    )
})

categorySchema.methods.populatedTree = function() {
    const options = {
        recursive: true,
        lean:      true,
        queryModifier(q) {
            return q.populate("items")
        }
    }
    return new Promise((resolve, reject) => {
        this.populate("items", (err, self) => {
            if(err) return reject(err)

            self.getChildrenTree(options, (err2, children) => {
                if(err2) return reject(err2)
                const ret = self.toObject()
                ret.children = children
                resolve(ret)
            })
        })
    })
}

categorySchema.methods.addItem = function(itemID) {
    this.items.push(itemID)
}
categorySchema.methods.removeItem = function(itemID) {
    for(let i = 0; i < this.items.length; ++i) {
        if(this.items[i] === itemID) {
            this.items.splice(i, 1)
            break
        }
    }
}

const Category = mongoose.model("Category", categorySchema)
module.exports = Category
