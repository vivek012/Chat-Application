import { mongoose } from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required: [true, "Please Enter the name "]
    },
    email: {
        type: String,
        required: [true, "Please Enter the email "],
        unique : true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    profilePic:{
        type: String, 
        default: ""
    },
    bio:{
        type: String,
    }

}, {timestamps: true})


  const User = mongoose.model('User' , userSchema)

export default  User;