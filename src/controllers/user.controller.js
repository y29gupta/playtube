import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    return { accessToken, refreshToken }

}


const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body
    if ([fullname, username, email, password].some((field) => {
        field?.trim() === ""
    })) {
        throw new apiError(400, "all fields are required")
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (user) {
        throw new apiError(401, "user already exists")
    }

    const avatarImg = req.files?.avatar[0].path


    let coverImagepath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImagepath = req.files.coverImage[0].path
    }

    if (!avatarImg) {
        throw new apiError(400, "avatar is required")
    }

    const avatarUpload = await uploadCloudinary(avatarImg)
    const coverUpload = await uploadCloudinary(coverImagepath)

    const createuser = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatarUpload?.url,
        coverImage: coverUpload?.url || ""
    })

    const createdUser = await User.findById(createuser._id)
    res.status(200).json(new apiResponse(200, createdUser, "user registered successfully"))


})
const userLogin = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if (!username && !email) {
        throw new apiError(400, "username or email is required")
    }

    const userExist = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!userExist) {
        throw new apiError(401, "user does not exists")
    }

    const passwordValid = userExist.isPasswordCorrect(password)
    if (!passwordValid) {
        throw new apiError(400, "invalid user credentails")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(userExist._id)
    const options = {
        httpOnly: true,
        secure: true
    }
    const loggedUser = await User.findById(userExist._id).select("-password ")
    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new apiResponse(200, loggedUser, "user logged in successfully"))

})

const userLogout = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1
        }
    },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new apiResponse(201,{},"user logged out"))

})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingToken = req.cookies?.refreshToken || req.header("Authorization").replace("Bearer", "")

    if (!incomingToken) {
        throw new apiError(400, "unauthorized access")

    }

    const decodeToken = await jwt.verify(incomingToken, process.env.REFRESH_TOKEN)

    const user = await User.findById(decodeToken._id)
    if (!user) {
        throw new apiError(401, " invalid refresh token")
    }
    if (incomingToken !== user?.refreshToken) {
        throw new apiError(401, "  refresh token expired or used")

    }

    const { accessToken, refreshToken } = generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200).cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new apiResponse(201, accessToken, refreshToken))
})

export { registerUser, userLogin, refreshAccessToken ,userLogout}