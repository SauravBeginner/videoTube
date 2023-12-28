import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, //cloudinary URL
    },

    // Define a field for the watch history, referencing the 'Video' model by ObjectId
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId(),
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timeStamps: true }
);

// Middleware: Pre-save hook to hash the password using bcrypt before saving to the database
userSchema.pre("save", async function (next) {
  // Check if the password field is modified before hashing
  if (!this.isModified("password")) return next();

  // Hash the password using bcrypt with a cost factor of 10
  this.password = await bcrypt.hash(this.password, 10);

  // Continue with the save operation
  next();
});

// Method: Custom method to check if a given password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  // Compare the provided password with the hashed password stored in the model
  return await bcrypt.compare(password, this.password);
};

// 29/12/23

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
