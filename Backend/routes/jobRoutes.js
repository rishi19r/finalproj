const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createJob,
    getAllJobs,
    applyJob
} = require("../controllers/jobController");

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", authMiddleware, getAllJobs);
router.post("/apply/:jobId", authMiddleware, applyJob);

module.exports = router;
