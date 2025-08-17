const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/google", async (req, res) => {
  try {
    const { email, name, googleId, picture } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        firstName: name,
        profilePic: picture,
        googleId,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ msg: "Google auth failed", error });
  }
});

module.exports = router;

module.exports = router;
