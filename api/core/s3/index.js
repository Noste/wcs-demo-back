const AWS = require('aws-sdk')

const config = require('../../config')

const s3Setup = {
    apiVersion: 'latest',
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
    signatureVersion: 'v4'
}


const s3 = new AWS.S3(s3Setup)

const generatePreSignedUrl = (operation, bucket, key, expiresIn = 60) => {
    const params = {
        Bucket: bucket,
        Key: key,
        Expires: expiresIn
    }

    return new Promise((resolve, reject) => {
        s3.getSignedUrl(operation, params, (err, url) => {
            if (err) {
                reject(err)
            } else {
                resolve(url)
            }
        })
    })
}

module.exports = { generatePreSignedUrl }
