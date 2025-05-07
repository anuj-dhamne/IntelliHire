import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
},{timestamps:true});
// password encryption using bcrypt
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
})
// function for comparing the entered password with paswword save in database
userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function (){
  return  jwt.sign(
        {
            _id:this._id,
             email:this.email,
             username:this.username,
             name:this.name    
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}
userSchema.methods.generateRefreshToken=function (){
    return  jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}
const User=mongoose.model("User",userSchema);

export default User;