const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route        GET api/profile/me
//@desc         Get current users profile
//@access       Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await (
      await Profile.findOne({ user: req.user.id })
    ).populated("user", ["name", "avatar"]);

    if (!profile) {
      res
        .status(400)
        .json({ msg: "There is no profile available for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route        POST api/profile/
//@desc         Create or update user profile
//@access       Private
router.post(
  "/",
  [
    auth,
    [check("status", "Status is a required field").not().isEmpty()],
    check("skills", "Skills is a required field").not().isEmpty(),
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
      }
    try {
      const profile = await (
        await Profile.findOne({ user: req.user.id })
      ).populated("user", ["name", "avatar"]);

      if (!profile) {
        res
          .status(400)
          .json({ msg: "There is no profile available for this user" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route        GET api/profile/
//@desc         Test route
//@access       Public
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;
