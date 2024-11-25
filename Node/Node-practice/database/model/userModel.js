const mongoose = require("mongoose");
const multer = require("multer")
const path = require("path");

const imagePath = "uploads"

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  hobby: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  image : {
    type: String,
    required: true,
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname , ".." , imagePath))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})



userSchema.statics.imageUpload = multer({ storage: storage }).single("image")

userSchema.statics.imagePath = imagePath

const UserModel = mongoose.model("userDatabase", userSchema);

module.exports = UserModel;