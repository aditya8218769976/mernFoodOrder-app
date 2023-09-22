const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const jwtSecret = "Thequickbrownfoxjumpsoverthelazydog."
// SignUp Logic Starts here //
router.post(
  "/createuser",
  [
    body("name", "Incorrect Name").isLength({ min: 5 }),
    body("email", "Incorrect Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
// SignUp Logic Ends here //

//  Login Logic starts here //
router.post(
  '/loginuser',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(req.body.email, req.body.password);
    try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare the plain text password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Create and sign the JWT
      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) throw err;
        res.json({ success: true, authToken: token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
