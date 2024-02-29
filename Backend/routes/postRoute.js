const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getUserPost,
  likePost,
  isPostLiked,
} = require("../controllers/postController");
const {
  getAllComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.use(verifyJWT);

router.route("/").get(getAllPost).post(createPost);

router.route("/:id").get(getUserPost).patch(updatePost).delete(deletePost);

router.route("/:id/comment").get(getAllComment).post(createComment);

router
  .route("/:id/comment/:commentId")
  .patch(updateComment)
  .delete(deleteComment);

router.route("/:id/like").get(isPostLiked).patch(likePost);

module.exports = router;
