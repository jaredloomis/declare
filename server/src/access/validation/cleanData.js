export default data => {
    Object.keys(data).forEach(key => {
        if(data[key] && data[key]._bsontype === "ObjectID")
            data[key] = data[key].toString()
    })
    return data
}
