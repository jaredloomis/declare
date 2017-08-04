import mongoose from "mongoose"

export default (...alternatives) => {
    class Union extends mongoose.SchemaType {
        constructor(key, options) {
            super(key, options, `Union(${alternatives})`)
        }
        
        cast(val) {
            const errors = []
            for(const alt of alternatives) {
                console.log(Object.keys(alt))
                try {
                    if(alt && val)
                        return alt.cast(val)
                } catch(ex) {
                    errors.push(ex)
                }
            }
            throw new mongoose.SchemaType.CastError(errors)
        }
    }
    mongoose.Schema.Types.Union = Union

    return Union
}
