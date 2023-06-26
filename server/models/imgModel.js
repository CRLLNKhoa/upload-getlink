const mongoose = require("mongoose");
const { modal, Schema } = mongoose;

const Image = new Schema({
  title: { type: String, default: "Ảnh mới" },
  uploader: { type: String , default: "Admin" },
  keyword: [{ type: String}],
  status: { type: Boolean, default: true },
  links: { type: String },
},{
    timestamps: true
});

const imageModal = mongoose.model("imgData", Image);

module.exports = imageModal;
