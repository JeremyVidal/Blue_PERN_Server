const router = require("express").Router();
const User = requre("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
	res.send('Hello World User!')
})

//signup

//login
router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then(
    (user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign(
              { id: user.id, email: user.email },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );
            res.status(200).json({
              user: user,
              message: "Successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Bad Gateway" });
          }
        });
      } else {
        res.status(500).send({ error: "User does not exist" });
      }
    },
    (err) => res.status(501).send({ error: "Failed to Process"})
  );
});

module.exports = router;