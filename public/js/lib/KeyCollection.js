// [{id: String, ...}] -> {[idN]: {id: idN, ...}, ...}
export default collection => {
    const object = {}
    for(const item of collection) {
        if(item)
            object[item.id || item._id] = item
    }
    return object
}
