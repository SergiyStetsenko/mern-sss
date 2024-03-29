const { Router } = require("express");
const Link = require("../models/Link");
const shortid = require("shortid");
require("dotenv").config();
const auth = require("../middlewere/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    // const baseUrl = process.env.BASE_URL;
    // редирект пользователя
    const { from } = req.body;
    // получаем уникальный код
    const code = shortid.generate();
    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }
    const to = "https://guarded-stream-30561.herokuapp.com" + "/t/" + code;
    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();
    return res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: "Warning Server" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Warning Server" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Warning Server" });
  }
});

module.exports = router;
