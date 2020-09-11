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




module.exports = router;
