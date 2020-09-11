const router = require('express').Router();
const User = require('../db').import('../models/user');



router.get('/', (req, res) => {
	res.send('Hello World User!')
})




module.exports = router;
