// @flow
import Promise from "bluebird"
import {S3}    from "aws-sdk"

const s3 = new S3()
s3.putObjectAsync    = Promise.promisify(s3.putObject)
s3.getObjectAsync    = Promise.promisify(s3.getObject)
s3.getSignedUrlAsync = Promise.promisify(s3.getSignedUrl)

const bucket = "declare-jloomis-dev"

export const storeAsset = (key: string, body: any, options: any) => {
    return s3.putObjectAsync({
        Bucket: bucket,
        Key: key,
        Body: body,
        ...options
    })
}

export const retrieveAsset = async (key: string, options: any) => {
    const {Body} = await s3.getObjectAsync({
        Bucket: bucket,
        Key: key,
        ...options
    })
    return Body
}

export const getAssetURL = (key: string, options: any) => {
    return s3.getSignedUrl("getObject", {
        Bucket: bucket,
        Key: key,
        ...options
    })
}
