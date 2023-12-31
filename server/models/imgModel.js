const mongoose = require("mongoose");
const { modal, Schema } = mongoose;

const Image = new Schema({
  title: { type: String, default: "Ảnh mới" },
  uploader: { type: String , default: "Admin" },
  keyword: [{ type: String}],
  status: { type: Boolean, default: true },
  links: { type: String },
  ip: { type: String, default: "0.0.0.0" },
},{
    timestamps: true
});

const imageModal = mongoose.model("imgData", Image);

module.exports = imageModal;
