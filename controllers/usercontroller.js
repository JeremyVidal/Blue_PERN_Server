const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post('/signup', (req, res) => {
	User.create({
		firstName: req.body.firstName,
    	lastName: req.body.lastName,
    	email: req.body.email,
    	password: bcrypt.hashSync(req.body.password, 11)
	})
	.then((user) => {
		let token = jwt.sign({ id: user.id }, process.env.SECRETKEY, { expiresIn: '1d' })
		res.json({
			user: user,
			message: 'User Created!',
			sessionToken: token
		});
	})
	.catch(err => res.status(500).json({ error: err }))
});

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
              process.env.SECRETKEY,
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