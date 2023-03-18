const express = require('express')
const router = express.Router()
const msgModel = require('../models/reportModel')
const AWS = require("aws-sdk");
AWS.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1",
});
const s3 = new AWS.S3({ appVersion: "2006-03-01" });


router.post('/report', async (req, res) => {
    try {
        const file = req.files[0]
        const {subject, helpMsg, contact, request} = req.body
        const uploadedFile = async (file) => {
            return new Promise(function (resolve, reject) {
                const { originalname, buffer } = file
                const uploadParams = {
                    Bucket: "classroom-training-bucket",
                    Key: `biswajit-aws/${originalname}`,
                    Body: buffer,
                };

                s3.upload(uploadParams, (err, data) => {
                    if (err) {
                        return reject({ error: err });
                    } else {
                        return resolve(data.Location);
                    }
                    });
                });
            };

            uploadedFile(file).then( async (data) => {
                req.body['file'] = data
                let saveData = await msgModel.create(req.body)
                return res.status(201).send({ status: true, msg: 'msg sending successfully', Data: saveData})
            }).catch((err)=>{
                console.log(err)
                res.status(400).send(err)
            })
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.all("/*", (req, res) => {
    return res.status(400).send({ status: false, msg: "end point is not valid" });
});
  
module.exports = router;