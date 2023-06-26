const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { saveImage } = require("./controllers/save");
const { loadImage, loadUploader, loadKeyword, loadImageFilter } = require("./controllers/load");

mongoose.set("strictQuery",false);

dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGDB_URL).then(()=>{
    console.log("Connected MongoDB!")
}).catch(err => console.error(err.message))

app.get("/", (req,res) => {
    res.redirect('https://www.facebook.com/lnkhoa1205');
})


app.post("/api/save",saveImage)
app.get("/api/load",loadImage)
app.post("/api/load/filter",loadImageFilter)
app.get("/api/load/uploader",loadUploader)
app.get("/api/load/keyword",loadKeyword)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})