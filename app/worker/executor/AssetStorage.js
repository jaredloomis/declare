// @flow
import Promise from "bluebird"
import {S3} from "aws-sdk"

const s3 = new S3()
s3.putObjectAsync = Promise.promisify(s3.putObject)
s3.getObjectAsync = Promise.promisify(s3.getObject)

const bucket = "declare-jloomis-dev"

export const uploadFile = (key: string, body: any, options: any) => {
    return s3.putObjectAsync({
        Bucket: bucket,
        Key: key,
        Body: body,
        ...options
    })
}

export const getFile = async (key: string, options: any) => {
    const {Body} = await s3.getObjectAsync({
        Bucket: bucket,
        Key: key,
        ...options
    })
    return Body
}
