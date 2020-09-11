const router = require('express').Router();
const Media = require('../db').import('../models/media');


router.get('/', (req, res) => {
	res.send('Hello World Media!')
})


module.exports = router;
