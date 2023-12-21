const express = require("express");
const {
  validateUser,
  userModel,
  validateLogin,
  createToken,
} = require("../models/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();
const { auth, authAdmin } = require("../midlewares/auth");

// ראוט שמציג משתמשים לפי חיפוש
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit || 0;
    const page = req.query.page - 1 || 0;

    let sFind = {};
    if (req.query.s) {
      const sExp = new RegExp(req.query.s, "i");
      sFind = { name: sExp };
    }

    const data = await userModel
      .find(sFind)
      .limit(limit)
      .skip(page * limit);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});
router.get("/showInfo", auth, async (req, res) => {
  try {
    const data = await userModel.findOne(
      { _id: req.tokenData._id },
      { password: 0 }
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/userInfo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findOne({ _id: id }, { password: 0 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
router.get("/isFollowed/:id", auth, async (req, res) => {
  try {
    let isFollowed = false;
    const idQ = req.params.id;
    const userId = req.tokenData._id;

    const user = await userModel.findOne({ _id: idQ });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const followerIndex = user.followers.indexOf(userId);
    if (followerIndex != -1) {
      isFollowed = true;
    }

    res.status(201).json(isFollowed);
  } catch (err) {
    res.json(err);
  }
});
router.post("/signUp", async (req, res) => {
  const validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const user = new userModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "*****";
    return res.status(201).json(user);
  } catch (err) {
    // code 11000 means that the eamail already exists
    if (err.code == 11000) {
      return res
        .status(400)
        .json({ err: "Email or user name already in system", code: 11000 });
    }
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/login", async (req, res) => {
  const validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    // here we check if the email does exist int the database
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ err: "Email is not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ err: "Password is not correct" });
    }

    const token = createToken(user._id, user.role);

    res
      .cookie("authToken", token, {
        httpOnly: false,
        expires: new Date(Date.now() + 1000 * 60 * 60),
      })
      .json(token);
  } catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
});

router.put("/follow/:id", auth, async (req, res) => {
  try {
    const idQ = req.params.id;

    const followingUser = await userModel.findOne({ _id: req.tokenData._id });
    const followedUser = await userModel.findOne({ _id: idQ });
    if (!followedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const followerIndex = followedUser.followers.indexOf(followingUser._id);
    const followedIndex = followingUser.follows.indexOf(followedUser._id);
    if (followerIndex === -1) {
      // add
      followedUser.followers.push(followingUser._id);
      followingUser.follows.push(followedUser._id);
    } else {
      // remove
      followedUser.followers.splice(followerIndex, 1);
      followingUser.follows.splice(followedIndex, 1);
    }
    //  אנחנו עושים סייב במקום אפדייט למרות שזה עדכון ולא הוספה,
    // פשוט כי כשאתה מוסיף לרשומה משהו שהאיידי שלו כבר קיים זה אוטומטית מעדכן במקום להוסיף אז כע
    const updatedFollowedUser = await followedUser.save();
    const updatedFollowingUser = await followingUser.save();
    const updatedUsers = [updatedFollowedUser, updatedFollowingUser];
    res.status(201).json(updatedUsers);
  } catch (err) {
    res.json(err);
  }
});

// give admin or take admin
router.patch("/:id", authAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    if (id == req.tokenData._id) {
      return res
        .status(401)
        .json({ err: "you tried to turn yourself into a user" });
    }
    const user = await userModel.findOne({ _id: id });
    if (user.role == "user") {
      const data = await userModel.updateOne({ _id: id }, { role: "admin" });
      res.json(data);
    } else {
      const data = await userModel.updateOne({ _id: id }, { role: "user" });
      res.json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const idQ = req.params.id;
    const data = await userModel.deleteOne(
      { _id: idQ, user_id: req.tokenData._id },
      req.body
    );
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
});

module.exports = router;
