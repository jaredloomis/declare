/*
type mongoose;

[@bs.val] external require: string => mongoose = "require";

let category: mongoose = require("../model/Category");

type category = {};

type category_input = {
    user: string
};
*/

/*
let categories: category_input => array(category) = obj =>
    if(obj.user && obj.user#isSuperAdmin()) {
        category#find()
    } else {
        raise({
            message: "Must be a super admin to access all categories."
        })
    };
    */


/*
import Category from "../model/Category"

export default {
    categories({user}) {
        if(user && user.isSuperAdmin()) {
            return Category.find({})
        } else {
            throw {
                message: "Must be a super admin to access all categories."
            }
        }
    },

    async category({id}, {user}) {
        // TODO check if user is in same organization
        const cat = await Category.findById(id)
        if(cat.owner === user.owner) {
            return cat
        } else {
            throw {
                message: "Cannot access categories not in your account."
            }
        }
    }
}*/
