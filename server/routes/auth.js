const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Неккоректный email')
      .exists()
      .isEmail(),
    check('password', 'Минимальная длинна 6 символов')
      .exists()
      .isLength({ min: 6 }),
    check('confirmPassword', 'Пароли не совподают')
      .exists()
      .custom((value, {req}) => value !== req.body.password),
    check('name', 'Поле name не может быть пустым!').exists(),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Неккоректные данные при регистрации!',
      });
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует!' });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      ...req.body,
      email,
      password: hashPassword,
    });

    await user.save();
    return res.status(201).json({ message: 'Пользователь зарегистрирован!' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong, please try again...' });
  }
});

router.post(
  '/login',
  [
    check('email', 'Email обязательное поле!')
      .exists()
      .normalizeEmail()
      .isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Неккоректные данные при регистрации!',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден!' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль!' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      return res.json({ token, ...user });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong, please try again...' });
    }
});

module.exports = router;
