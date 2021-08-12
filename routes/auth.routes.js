const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();
require("dotenv").config();
// /api/auth/register

router.post(
  "/register",
  [
    check("email", "email error").isEmail(),
    check("password", "min length 6  symbol").isLength({ min: 6 }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Warning register",
        });
      }
      const { email, password } = req.body;
      //    проверка еmail
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: " this user already exists " });
      }
      //    хеширования пароля
      const hashedPassword = await bcrypt.hash(password, 12);
      //    создания нового пользователя
      const user = new User({
        email,
        password: hashedPassword,
      });
      //    сохранения пользователя
      await user.save();

      return res.status(201).json({ message: "user added" });
    } catch (error) {
      // проверяем работу сервера
      return res.status(500).json({ message: "Warning Server" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "email error").normalizeEmail().isEmail(),
    check("password", "min length 6  symbol").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Warning login",
        });
      }
      const { email, password } = req.body;
      // находим пользователя по емаил
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: " Error user" });
      }
      //  проверяем совпадения пароля
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: " Error password" });
      }

      // авторизация
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });
      res.json({
        token,
        userId: user.id,
      });
    } catch (error) {
      res.status(500).json({ message: "Warning Server" });
    }
  }
);

module.exports = router;
