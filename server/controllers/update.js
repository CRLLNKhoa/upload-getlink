const Image = require("../models/imgModel");

const updateImages = async (req, res) => {
  const id = req.params.id;
  const {action} = req.query;
  try {
    if(action === "show"){
        const up = await Image.findByIdAndUpdate(
            id,
            {status: true },
            { new: true }
          );
          return res.json({
            status: 200,
            message: "Thành công!",
            id: up._id,
          });
    }
    if(action === "hidden"){
        const up = await Image.findByIdAndUpdate(
            id,
            {status: false },
            { new: true }
          );
          return res.json({
            status: 200,
            message: "Thành công!",
            id: up._id,
          });
    }
    else  return res.json({
        status: 404,
        message: "Thiếu  action!",
      });
  } catch (error) {
    return res.json({
      status: 400,
      message: "Không thành công!",
    });
  }
};

module.exports = {
  updateImages,
};
