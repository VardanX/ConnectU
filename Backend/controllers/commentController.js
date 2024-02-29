const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/asyncWrapper");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

/**
 * @description Get posts comments
 * @route GET /posts/:id/comment
 * @access Private
 */
const getAllComment = asyncWrapper(async (req, res, next) => {
  const { id: postId } = req.params;

  // Confirm the data
  if (!postId) return next(createCustomError("Post id is required", 400));

  // Retrieve the list of comments associate with the post
  const { comments } = await Post.findOne(
    { _id: postId },
    { comments: 1, _id: 0 }
  )
    .lean()
    .exec();

  const commentList = await Comment.find({ _id: { $in: comments } })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  if (!commentList.length)
    return next(createCustomError("Comments not found", 404));

  return res.status(200).json({ commentList });
});

/**
 * @description Create posts comments
 * @route POST /posts/:id/comment
 * @access Private
 */
const createComment = asyncWrapper(async (req, res, next) => {
  const { id: postId } = req.params;

  const { description, userId } = req.body;

  // Confirm the data
  if (!postId) return next(createCustomError("Post id is required", 400));

  if (!description || !userId)
    return next(createCustomError("All fields are required", 400));

  const post = await Post.findOne({ _id: postId }).exec();
  if (!post) return next(createCustomError("Post not found", 404));
  const { comments } = post;

  const user = await User.findOne({ _id: userId }).lean().exec();
  if (!user) return next(createCustomError("User not found", 404));
  const { firstName, lastName, picturePath } = user;

  //   create comments
  const postComments = await Comment.create({
    postId,
    userId,
    userPicturePath: picturePath,
    userName: `${firstName} ${lastName}`,
    description,
  });

  if (!postComments)
    return next(createCustomError("comment unsuccessfull", 400));

  post.comments = [...comments, postComments._id];
  await post.save();

  return res.status(200).json({ message: "comment has been added" });
});

/**
 * @description Update posts comments
 * @route PATCH /posts/:id/comment/:commentId
 * @access Private
 */
const updateComment = asyncWrapper(async (req, res, next) => {
  const { id: postId, commentId } = req.params;
  const { description, userId } = req.body;

  // Confrim data
  if (!postId || !commentId)
    return next(createCustomError("Post id or comment id is requuired", 400));

  if (!description || !userId)
    return next(createCustomError("All filed is required", 400));

  const comment = await Comment.findOne({ _id: commentId }).exec();

  if (!comment) return next(createCustomError("Comment not found", 404));

  if (comment.userId.valueOf() !== userId)
    return next(createCustomError("Comment doesn't belongs to you", 400));

  comment.description = description;
  await comment.save();

  return res.status(200).json({ message: "comment has been updated" });
});

/**
 * @description Delete posts comments
 * @route DELETE /posts/:id/comment/:commentId
 * @access Private
 */
const deleteComment = asyncWrapper(async (req, res, next) => {
  const { id: postId, commentId } = req.params;
  const { userId } = req.body;

  // Confrim data
  if (!postId || !commentId || !userId)
    return next(
      createCustomError("Post id or comment id or User id is requuired", 400)
    );

  const post = await Post.findOne({ _id: postId }).exec();
  if (!post) return next(createCustomError("Post not found", 404));

  const comment = await Comment.findOne({ _id: commentId }).exec();
  if (!comment) return next(createCustomError("Comment not found", 404));

  if (comment.userId.valueOf() !== userId)
    return next(createCustomError("Post doesn't belongs to you", 400));

  const deletedComment = await comment.deleteOne();
  if (!deletedComment)
    return next(createCustomError("comment has not been deleted", 400));

  // update comment field of post modal excluding the deleted comment
  let commentList = [];
  commentList = post.comments.filter(
    (comment, index) => comment.valueOf() !== commentId
  );

  post.comments = commentList;
  await post.save();

  return res.status(200).json({ message: "comment has been deleted" });
});

module.exports = { getAllComment, createComment, updateComment, deleteComment };
