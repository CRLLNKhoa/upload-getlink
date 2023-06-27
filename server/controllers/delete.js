const Image = require("../models/imgModel");

const delImages = async (req,res) => {
    const id =  req.params.id
    try {
        const del = await Image.findByIdAndDelete({
            _id: id
        })
        return res.json({
            status: 200,
            message: "Thành công!",
            id: del._id,
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: "Không thành công!",
        })
    }
}

module.exports = {
    delImages
}