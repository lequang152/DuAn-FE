// import * as AWS from "aws-sdk"
// import { PutObjectRequest } from "aws-sdk/clients/s3"

import AWS, { S3 } from "aws-sdk"
import { LocalStorageService, SURVEY_INPUT_KEY } from "./local_survey"
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

export type PostS3Options = {
    username?: string
    questionId: number
    answerToken: string
    blob: Blob
    extension?: string
}

export async function postToS3AWS(option: PostS3Options) {

    const local = LocalStorageService.getLocalStorageInstance(localStorage)
    const answer = local.get([SURVEY_INPUT_KEY])
    let answerTitle: string
    answer.title ? (answerTitle = answer.title.en_US.split(" ").join("_")) : (answerTitle = "anonymous_survey")

    let replacedName = ""
    if (option.username !== undefined) {
        replacedName = option.username.split(" ").join("_")
    }

    const accessKeyS3 = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID || ""
    const secretAccessKeyS3 = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY || ""
    const bucketNameS3 = process.env.NEXT_PUBLIC_S3_BUCKET_NAME || ""
    const regionS3 = process.env.NEXT_PUBLIC_S3_REGION_NAME || ""
    const fileKey = `${replacedName ? replacedName : "public"}/${answerTitle}/${option.answerToken}_${option.questionId}/${
        replacedName ? replacedName : "anonymous"
    }.${option.extension}`

    const s3 = new AWS.S3({
        credentials: {
            accessKeyId: accessKeyS3,
            secretAccessKey: secretAccessKeyS3,
        },
        region: regionS3,
    })

    const data = await s3
        .upload({
            Bucket: bucketNameS3,

            Key: fileKey,
            Body: option.blob,
        })
        .promise()

    return data

    // const s3 = new AWS.S3({
    //     accessKeyId: accessKeyS3,
    //     secretAccessKey: secretAccessKeyS3,
    // })
    // const bucketName = bucketNameS3

    // // const fileStream = fs.createReadStream(fileToUpload)
    // const params: PutObjectRequest = {
    //     Bucket: bucketName,
    //     Key: fileKey,
    //     Body: option.blob,
    // }
    // s3.upload(params, option.callback)
}
