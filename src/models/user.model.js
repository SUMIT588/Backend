import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],

      refreshToken: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

// run before saving userData for password encryption
userSchema.pre("save", async function (next){
  if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)    // encrypt password
  next()
})

// add custom method for comparing encrypted password and user input password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id : this._id, 
    email : this.email,
    fullName : this.fullName, 
    userName : this.userName
  }, process.env.ACCESS_TOKEN_SECRET, 
{
  expiresIn : process.env.ACCESS_TOKEN_EXPIRY
 }
)
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this._id,
     
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
}

export const User = mongoose.model("User", userSchema);
