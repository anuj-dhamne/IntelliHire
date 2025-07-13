import User  from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"



const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId);
        if(!user){
            throw new ApiError(404,"User not exist !");
        }
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;
       await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(404,"User not exist !");
    }
}
const userRegister=asyncHandler(async (req,res)=>{

    // getting user data
    const { name,username, email, password } = req.body;

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
       return res.status(400).json(new ApiResponse(400,null,"Email or username already exists ! "));
    }

    // creating user Object and upload entry in DB
    const user=await User.create({
        name,
        email,
        username:username.toLowerCase(),
        password,
    })
    // removing password and refreshtoken for sending response

    const createdUser=await User.findById(user._id).select("-password -refreshToken") ;

    // check for user creation 
    if(!createdUser){
        return res.status(500).json(500,null,"User not created ")
    }
    return res.status(201).json(new ApiResponse(200,createdUser,"User Created Successfully !"));
})
const loginUser=asyncHandler(async (req,res)=>{
 const {username,password}=req.body;
 const user=await User.findOne({
    username
 })
 if(!user){
    return res.status(400).json({ message: "Invalid email or password" });
 }
 const isPassword=await user.isPasswordCorrect(password);

 if(!isPassword){
    return res.status(401).json({ message: "Invalid email or password" });
 }

 const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id);

 return res.status(200).json(
    new ApiResponse(200, { accessToken, refreshToken, user: { _id: user._id, username: user.username, email: user.email } }, "Login successful.")
);
});
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) throw new ApiError(404, "User not found.");

    return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully."));
});
const logout=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },{
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User Logout Successfully !"));
})

export {loginUser,userRegister,getUserProfile,logout}