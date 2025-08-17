const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // multer middleware
const {
    createPost,
    getFeed,
    likePost,
    commentOnPost
} = require("../controllers/postController");

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost); // ✅ file upload
router.get("/feed", authMiddleware, getFeed);
router.put("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentOnPost);

module.exports = router;
