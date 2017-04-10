import mongoose from "mongoose"

export default (alternatives) => {
    function Sum(key, options) {
        mongoose.SchemaType.call(this, key, options, `Sum(${alternatives}`)
    }
    Sum.prototype = Object.create(mongoose.SchemaType.prototype)

    // `cast()` takes a parameter that can be anything. You need to
    // validate the provided `val` and throw a `CastError` if you
    // can't convert it.
    Sum.prototype.cast = function(val) {
        const errors = []
        for(const alt of alternatives) {
            try {
                return alt.cast(val)
            } catch(ex) {
                errors.push(ex)
            }
        }
        throw new Error(errors)
    }

    return Sum
}
