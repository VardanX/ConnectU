const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/asyncWrapper");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

/**
 * @description Get all users
 * @route GET /users
 * @access Private
 */
const getAllUser = asyncWrapper(async (req, res, next) => {
  const { search } = req.query;
  const keywords = search
    ? {
        $or: [
          {
            firstName: { $regex: search, $options: "i" },
          },
          {
            lastName: { $regex: search, $options: "i" },
          },
          {
            email: { $regex: search, $options: "i" },
          },
        ],
      }
    : {};
  const users = await User.find(keywords)
    .find({
      _id: { $ne: req.userId },
    })
    .select("-password")
    .lean()
    .exec();

  if (!users?.length) return next(createCustomError("No user found", 404));
  return res.status(200).json({ users });
});

/**
 * @description Get single users
 * @route GET /users/id
 * @access Private
 */
const getSingleUser = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params;

  // Confrim data
  if (!_id) return next(createCustomError("User id is required", 400));

  const user = await User.findOne({ _id }).select("-password").lean().exec();

  if (!user) return next(createCustomError("User not found", 404));
  return res.status(200).json({ user });
});

/**
 * @description Create a user
 * @route POST /users
 * @access Private
 */
const createUser = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, friends, address, occupation } =
    req.body;

  // Confrim data
  if (!firstName || !lastName || !email || !password || !address || !occupation)
    return next(createCustomError("All fields are required.", 400));

  // Confrim valid email address
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return next(createCustomError("Enter a Valid email address", 400));

  // Find the duplicate email address
  const duplicateUser = await User.findOne({ email }).lean().exec();
  if (duplicateUser)
    return next(createCustomError("Email already exists", 409));

  // Hashing the password
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    address,
    occupation,
  });

  if (!user) return next(createCustomError("User creation unsuccessfull", 400));

  return res.status(201).json({
    message: `user ${firstName} ${lastName} has been created successfully`,
  });
});

/**
 * @description Update a user
 * @route PATCH /users/id
 * @access Private
 */
const updateUser = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params;
  const { firstName, lastName, address, occupation } = req.body;

  // Confrim data
  if (!_id || !firstName || !lastName || !address || !occupation)
    return next(createCustomError("All fields are required.", 400));

  // Confirm if the user exixt?
  const user = await User.findOne({ _id }).exec();

  if (!user) return next(createCustomError("User not found", 404));

  user.firstName = firstName;
  user.lastName = lastName;
  user.address = address;
  user.occupation = occupation;

  const updatedUser = await user.save();

  return res
    .status(200)
    .json({ message: `${updatedUser.firstName} has been updated` });
});

/**
 * @description Upload profile picture
 * @route PATCH /users/profilepicture/id
 * @access Private
 */
const uploadProfilePicture = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params;
  const { picturePath } = req.body;
  if (!_id || !picturePath)
    return next(createCustomError("All fields are required", 400));

  const user = await User.findOne({ _id }).exec();
  if (!user) return next(createCustomError("User not found", 404));

  const posts = await Post.find({ userId: _id }).exec();
  user.picturePath = picturePath;
  posts.map(async (post) => {
    post.userPicturePath = picturePath;
    await post.save();
  });
  await user.save();
  return res.status(200).json({ message: "profile picture uploaded" });
});
/**
 * @description Delete user
 * @route DELETE /users/id
 * @access Private
 */
const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params;

  // Confirm data
  if (!_id) return next(createCustomError("User id is required", 400));

  const user = await User.findOne({ _id }).exec();

  if (!user) return next(createCustomError("user not found", 404));

  const userDelete = user.deleteOne();
  const postDelete = Post.deleteMany({
    _id: { $in: user.post },
  });
  const commentDelete = Comment.deleteMany({ userId: _id });

  // delete user post and comment
  await Promise.all([userDelete, postDelete, commentDelete]);

  return res.status(200).json({
    message: "user has been deleted successfully",
  });
});

/**
 * @description Get all user that is not friend
 * @route GET /users/unknownpeople
 * @access Private
 */
const getNotFriendUser = asyncWrapper(async (req, res, next) => {
  const { userId } = req;

  if (!userId) return next(createCustomError("User id is required", 400));

  let users = await User.find({ _id: { $ne: userId } })
    .select("-password")
    .exec();
  users = users.filter((user) => !user.friends.includes(userId));

  if (!users?.length) return next(createCustomError("No user found", 404));
  return res.status(200).json({ users });
});

module.exports = {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  uploadProfilePicture,
  getNotFriendUser,
};
