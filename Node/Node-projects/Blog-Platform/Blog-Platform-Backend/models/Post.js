let mongoose = require("mongoose")


let postSchema = mongoose.Schema({
    title : {
        type : "String",
        required: "true"
    },
    content : {
        type : "String",
        required: "true"
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})


const PostModel = mongoose.model("Post" , postSchema)

module.exports = PostModel