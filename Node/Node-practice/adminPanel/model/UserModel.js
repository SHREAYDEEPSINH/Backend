const mongoose = require("mongoose");
const multer = require("multer")
const path = require("path")

const imagePath = "uploads"


const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    profileImage : {
        type : String,
        required : true,
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , imagePath ))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  const upload = multer({ storage: storage }).single("profileImage");

  userSchema.statics.imageUpload = upload;
  userSchema.statics.imagePath = imagePath ; 


const UserModel = mongoose.model("adminPanel" , userSchema);

module.exports = UserModel