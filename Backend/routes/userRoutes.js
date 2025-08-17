const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const {
    getUserProfile,
    updateUserProfile,
    sendConnectionRequest,
    acceptConnectionRequest
} = require("../controllers/userController");
const User = require("../models/User");
const router = express.Router();

router.get("/:id", authMiddleware, getUserProfile);
router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "bannerPic", maxCount: 1 }
  ]),
  updateUserProfile
);
// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password exclude
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/connections/send", authMiddleware, sendConnectionRequest);
router.post("/connections/accept", authMiddleware, acceptConnectionRequest);



module.exports = router;
