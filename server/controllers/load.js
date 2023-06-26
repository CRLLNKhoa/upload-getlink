const Image = require("../models/imgModel");


const loadImage = async (req,res) => {
    const limit = Number(req.query.limit) ||  20
    try {
        const imgs = await Image.find().limit(limit)
        const num = await Image.count()
        return res.json({
            status: 200,
            message: "Thành công!",
            data: imgs,
            totalImgs: num
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: "Không thành công!",
        })
    }
}

const loadUploader = async (req,res) => {
    try {
        const uploader = await Image.distinct( "uploader" )
        return res.json({
            status: 200,
            message: "Thành công!",
            data: uploader,
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: "Không thành công!",
        })
    }
}

const loadKeyword = async (req,res) => {
    try {
        const keyword = await Image.distinct( "keyword" )
        return res.json({
            status: 200,
            message: "Thành công!",
            data: keyword,
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: "Không thành công!",
        })
    }
}

const loadImageFilter = async (req,res) => {
    const limit = Number(req.query.limit) ||  20
    const {filter,type} = req.body
    try {
        if(type === "uploader"){
            const total = await Image.find({
                uploader: filter,
            })
            const num =total.length
            const imgs = await Image.find({
                uploader: filter,
            }).limit(limit)
            return res.json({
                status: 200,
                message: "Thành công!",
                data: imgs,
                totalImgs: num
            })
        }
        if(type === "keyword"){
            const total = await Image.find({
                keyword: filter,
            })
            const num =total.length
            const imgs = await Image.find({
                keyword: filter,
            }).limit(limit)
            return res.json({
                status: 200,
                message: "Thành công!",
                data: imgs,
                totalImgs: num
            })
        }
       
    } catch (error) {
        return res.json({
            status: 400,
            message: "Không thành công!",
        })
    }
}

module.exports = {
    loadImage,loadUploader,loadKeyword,loadImageFilter
  };