const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/User");

/**
 * @description Get all user friends
 * @route GET /friends
 * @access Private
 */
const getAllFriend = asyncWrapper(async (req, res, next) => {
  const { userId: currentUserId } = req;
  if (!currentUserId) return next(createCustomError("UserId is required", 400));

  const user = await User.findById(currentUserId)
    .populate({ path: "friends", select: "_id firstName lastName picturePath" })
    .exec();
  if (!user) return next(createCustomError("User not found", 404));

  if (!user.friends?.length)
    return next(createCustomError("Friends list empty", 404));

  return res.status(200).json({ friends: user.friends });
});

/**
 * @description Add friends
 * @route PATCH /friends/add
 * @access Private
 */
const addFriend = asyncWrapper(async (req, res, next) => {
  const { userId: currentUserId } = req;
  const { userId } = req.body;

  if (!currentUserId || !userId)
    return next(createCustomError("All fields are required", 400));

  const currentUser = await User.findById(currentUserId).exec();
  const user = await User.findById(userId).exec();
  if (!currentUser || !user)
    return next(createCustomError("User not found", 404));

  if (
    currentUser.friends.includes(userId) ||
    user.friends.includes(currentUserId)
  )
    return res.status(200).json({ message: "Already Friend" });

  currentUser.friends.push(userId);
  user.friends.push(currentUserId);
  await currentUser.save();
  await user.save();
  return res.status(200).json({ message: "Friend has been added" });
});

/**
 * @description Remove friends
 * @route PATCH /friends/remove
 * @access Private
 */
const removeFriend = asyncWrapper(async (req, res, next) => {
  const { userId: currentUserId } = req;
  const { userId } = req.body;

  if (!currentUserId || !userId)
    return next(createCustomError("All fields are required", 400));

  const currentUser = await User.findById(currentUserId).exec();
  const user = await User.findById(userId).exec();
  if (!currentUser || !user)
    return next(createCustomError("User not found", 404));

  if (
    !currentUser.friends.includes(userId) ||
    !user.friends.includes(currentUserId)
  )
    return res.status(200).json({ message: "Not a friend" });

  currentUser.friends = currentUser.friends.filter(
    (item) => item.valueOf() !== userId
  );
  user.friends = user.friends.filter(
    (item) => item.valueOf() !== currentUserId
  );

  await currentUser.save();
  await user.save();
  return res.status(200).json({ message: "Friend has been removed" });
});

const isFriend = asyncWrapper(async (req, res, next) => {
  const { userId: currentUserId } = req;
  const { id: userId } = req.params;

  if (!currentUserId || !userId)
    return next(createCustomError("All fields are required", 400));

  const currentUser = await User.findById(currentUserId).exec();
  const user = await User.findById(userId).exec();
  if (!currentUser || !user)
    return next(createCustomError("User not found", 404));

  if (
    currentUser.friends.includes(userId) ||
    user.friends.includes(currentUserId)
  ) {
    return res.status(200).json({ isFriend: true });
  } else {
    return res.status(200).json({ isFriend: false });
  }
});

module.exports = { getAllFriend, addFriend, removeFriend, isFriend };
