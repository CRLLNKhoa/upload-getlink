const Image = require("../models/imgModel");

const saveImage = async (req, res) => {
  const { title, uploader, keyword, links,ip } = req.body;
  try {
    const defaultKeyword = []
    const handleKeyword = keyword.split(" ")
    const resultHandle = handleKeyword.filter(function () { return true })
    console.log(resultHandle)
    for (k of resultHandle) {
        if(k.length > 1){
            defaultKeyword.push(k)
        }
      }
    const newImage = await Image.create({
      title,
      uploader,
      links,
      keyword: defaultKeyword,
      ip,
    });
    res.json({
      status: 200,
      message: "Lưu vào website thành công!",
      data: newImage,
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  saveImage,
};
