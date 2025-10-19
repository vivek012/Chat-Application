import { generateToken } from "../lib/utils.js";
import User from "./../models/usermodel.js";
import cloudinary from "../lib/cloudinary.js";
import bcrypt from "bcryptjs";



// Signup a new user 

export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, bio } = req.body;

        if (!fullName && !email && !password && !bio) {
            return res.json({
                success: false,
                message: "Missing  Details"
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.send({
                success: false,
                message: "Account Already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create(
            { fullName, email, password: hashedPassword, bio }
        )

        const token = generateToken(newUser._id)

        res.status(200).json({
            success : true,
            token,
            data: {
                user: newUser
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            data: {
                message: error.message
            }
        })
    }
}

// Login User 

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
               success: false,
                message: "user does not Exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                success: false,
                message: "Enter correct Password"
            })
        }


        const token = generateToken(user._id)

        res.status(200).json({
            success: true,
            token,
            data: {
                user,
                message: " Login sucessful"
            }
        })


    } catch (error) {
        console.log(error.message)

        res.json({
            success: false,
            message: error.message
        })

    }

}

export const checkAuth = (req, res) => {
    res.json({
        success: true,
        user: req.user
    })
}
 
//  controllers to update user profile details

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, fullName, bio } = req.body;

        const userId = req.user._id;
        let updateUser;

        if (!profilePic) {
            updateUser = await User.findByIdAndUpdate(userId, {
                fullName,
                bio
            }, {new: true})
        } else {
            const upload = await cloudinary.uploader.upload(profilePic)
            updateUser = await User.findByIdAndUpdate(userId , {bio , fullName , profilePic: upload.secure_url}, {new: true})
        }

        res.json({
            success: true,
            data:{
                user: updateUser
            }
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })

    }
}