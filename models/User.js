import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  // field and types to create, find document each time controller function is called...
  userName: {
    type: String,
    required: [true, "Please Provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide password"],
    minLength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: "Kathmandu",
  },
});

// password must be hashed before saving in the database...
userSchema.pre("save", async function () {
  // if we are not changing the password and only modify other filed then we use isModified method

  if (!this.isModified("password")) return; // since password is not modified we are not returning hash password again from scratch

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// random token generated using Jsonwebtoken using user id, Secret code and expiry data..
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRY_DATE,
  });
};

// password compared with user sending from client with hashed password in database..
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// model is created using Schema.. (can be same as Table replica..)

export const User = mongoose.model("User", userSchema);
