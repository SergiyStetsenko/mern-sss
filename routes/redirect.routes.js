const { Router } = require("express");
const Link = require("../models/Link");
const router = Router();

router.get("/:code", async (req, res) => {
  // получаем ту ссылку с которой работаем по коду
  try {
    const link = await Link.findOne({ code: req.params.code });
    if (link) {
      link.clicks++;
      await link.save();
      return res.redirect(link.from);
    }
    res.status(404).json({ message: "Url error" });
  } catch (error) {
    res.status(500).json({ message: "Warning Server" });
  }
});

module.exports = router;
