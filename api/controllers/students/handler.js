const config = require('../../config')

const { createStudent, listStudents } = require('./queries')
const { generatePreSignedUrl } = require('../../core/s3')

const bucketName = config.s3Bucket

const createItem = async (req, res) => {
    try {
        const { body } = req

        const nStudent = await createStudent(body)

        if (nStudent) {
            res.apiResponse(nStudent)
        }
    } catch (error) {
        res.apiBadRequest(new Error('Error during the creation of a student'))
    }
}

const getPreSignedUrl = async (req, res) => {
    try {
        const { keyName, operation } = req.body
        const preSignedUrl = await generatePreSignedUrl(operation, bucketName, keyName)
        if (preSignedUrl) {
            res.apiResponse(preSignedUrl)
        }
    } catch(err) {
        res.apiBadRequest(new Error('Error during the creation of the presigned url'))
    }
}

const listItems = async (req, res) => {
    try {
        const students = await listStudents({})
        res.apiResponse(students)
    } catch (error) {
        res.apiNotFound(new Error('No Students found'))
    }
}

module.exports = { createItem, getPreSignedUrl, listItems }
