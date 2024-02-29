const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/asyncWrapper");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const { use } = require("../routes/userRoute");

/**
 * @description Get all posts
 * @route GET /posts
 * @access Private
 */
const getAllPost = asyncWrapper(async (req, res, next) => {
  const post = await Post.find({}).sort({ createdAt: -1 }).lean().exec();

  if (!post?.length) return next(createCustomError("No Post found", 404));

  return res.status(200).json({ post });
});

/**
 * @description Get user post
 * @route GET /posts/:id
 * @access Private
 */
const getUserPost = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;

  // Confirm the data
  if (!userId) return next(createCustomError("User id is required", 400));

  // Retrieve the list of post associate with the given userId
  const post = await Post.find({ userId })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  if (!post?.length) return next(createCustomError("Post not found", 404));
  return res.status(200).json({ post });
});

/**
 * @description Create new post
 * @route POST /posts
 * @access Private
 */
const createPost = asyncWrapper(async (req, res, next) => {
  const { userId, description, postPicturePath } = req.body;

  // Confirm data
  if (!userId || !description || !postPicturePath)
    return next(createCustomError("All fields are required", 400));

  const user = await User.findById(userId).exec();

  const { firstName, lastName, friends, picturePath, address } = user;

  // Create post
  const post = await Post.create({
    userId,
    description,
    postPicturePath,
    firstName,
    lastName,
    address,
    friends,
    userPicturePath: picturePath,
  });

  if (!post) return next(createCustomError("Post creation unsuccessfull", 400));

  const postId = post._id.valueOf();

  // Adding post to the belongs user
  user.post = [...user.post, postId];
  await user.save();

  return res
    .status(200)
    .json({ message: "Post has been created successfully" });
});

/**
 * @description Update posts
 * @route PATCH /posts/:id
 * @access Private
 */
const updatePost = asyncWrapper(async (req, res, next) => {
  const { id: postId } = req.params;

  // for testing only, set userId on request body
  const { userId, caption } = req.body;

  // Confrim data
  if (!caption || !userId)
    return next(createCustomError("All Fields are required", 400));

  const post = await Post.findById(postId).exec();

  if (!post) return next(createCustomError("Post not found", 404));

  if (post.userId.valueOf() !== userId)
    return next(createCustomError("Post doesn't belongs to you", 400));

  post.description = caption;

  await post.save();
  return res.status(200).json({ message: "Post has been updated" });
});

/**
 * @description Delete posts
 * @route DELETE /posts/:id
 * @access Private
 */
const deletePost = asyncWrapper(async (req, res, next) => {
  const { id: postId } = req.params;

  // for testing only, set the userId to request body
  const { userId } = req.body;

  // Confirm data
  if (!userId) return next(createCustomError("User id is required", 400));

  const user = await User.findById(userId).exec();

  const post = await Post.findById(postId).exec();

  if (!post) return next(createCustomError("Post not found", 404));

  if (post.userId.valueOf() !== userId)
    return next(createCustomError("Post doesn't belongs to you", 400));

  // delete post comment
  const deletedComment = await Comment.deleteMany({
    _id: { $in: post.comments },
  });

  // update user post field
  let postList = [];
  postList = user.post.filter((item) => item.valueOf() !== postId);

  user.post = postList;
  await user.save();

  const deletedPost = await post.deleteOne();

  if (!deletedPost && !deletedComment)
    return next(createCustomError("Post has not been deleted", 424));

  return res.status(200).json({ message: "Post has been deleted" });
});

/**
 * @description like and unlike posts
 * @route PATCH /posts/:id
 * @access Private
 */
const likePost = asyncWrapper(async (req, res, next) => {
  const { id: postId } = req.params;
  const { userId } = req;

  // Confirm the data
  if (!userId) return next(createCustomError("User id is required", 400));

  const post = await Post.findById(postId).exec();

  if (!post) return next(createCustomError("Post not found", 404));

  if (!post.likes.includes(userId)) {
    await post.updateOne({ $push: { likes: userId } });
    return res.status(200).json({ message: "Like" });
  } else {
    await post.updateOne({ $pull: { likes: userId } });
    return res.status(200).json({ message: "UnLike" });
  }
});

/**
 * @description Get like or unlike status of posts
 * @route GET /posts/:id
 * @access Private
 */
const isPostLiked = asyncWrapper(async (req, res, next) => {
  const { id: postId } = req.params;
  const { userId } = req;

  // Confirm the data
  if (!userId) return next(createCustomError("User id is required", 400));

  const post = await Post.findById(postId).exec();

  if (!post) return next(createCustomError("Post not found", 404));

  return !post.likes.includes(userId)
    ? res.status(200).json({ isPostLiked: false })
    : res.status(200).json({ isPostLiked: true });
});

module.exports = {
  getAllPost,
  getUserPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  isPostLiked,
};
