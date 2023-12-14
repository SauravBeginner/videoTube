import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    watchHistory: {
      type: mongoose.Schema.type.ObjectId(),
      ref: "Video",
    },
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

export const User = mongoose.model("User", userSchema);
