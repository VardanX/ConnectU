const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    picturePath: {
      type: String,
      default:
        "https://res.cloudinary.com/dcy8a9bou/image/upload/v1681594618/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55_b06tzk.jpg",
    },

    address: {
      type: String,
      required: true,
    },

    occupation: {
      type: String,
      required: true,
    },
    post: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
