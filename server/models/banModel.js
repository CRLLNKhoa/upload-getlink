const mongoose = require("mongoose");
const { modal, Schema } = mongoose;

const Ban = new Schema({
  ip: { type: String, unique: true, required: true },
});

const banModal = mongoose.model("banData", Ban);

module.exports = banModal;
