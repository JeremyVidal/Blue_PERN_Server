const router = require('express').Router();
const User = require('../db').import('../models/user');
const validateSession = require('../middleware/validate-session');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//signup http://localhost:3025/user/signup
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


//login  http://localhost:3025/user/login
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

//delete user http://localhost:3025/user/
router.delete("/", validateSession, function (req, res) {
  let userid = req.user.id;

  const query = {where: {id: userid}};

  User.destroy(query)
  .then(() => res.status(200).json({ message: "User Deleted"}))
  .catch((err) => res.status(500).json({error:err}));
});

module.exports = router;



